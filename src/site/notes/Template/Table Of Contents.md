---
{"dg-publish":true,"dg-permalink":"true","permalink":"/true/","noteIcon":"Biohazard_symbol.svg","dg-note-properties":{}}
---


<%*
// ====================================================================================================================
// 20250911: Updates from v3.2;
// FRONTMATTER CUSTOMISATION
//     Use Frontmatter to customise TOC settings for each note. Use these optional keys to make changes to defaults:
//       - toc-start-level = Set header level for TOC to start from 1-6 (changes value of variable: headerBeginDefault)
//       - toc-start-level-prompt = Explicitly enable/disable prompt dialogue to set start header level [true|false] 
//         (Changes value of variable: headerBeginPromptDisable)
//       - toc-depth-level = Set header level where TOC stops from 1-6 (changes value of variable: levelDepthDefault)
//       - toc-depth-level-prompt = [true|false] (changes value of variable: levelDepthPromptDisable)
//       - toc-links-style = [wikilinks|markdown] (changes value of variable: useWikilinks)
//       - toc-style = [callout|header] (changes value of variable: useHeader)
// TOC LINK GENERATION
//   • Minor tweaks:
//      - Removed ':' before converting header to URI format.
//      - Added comma to list of characters to allow in TOC markdown links.
// TOC STARTING AND ENDING HEADER LEVELS
//   • Header Begin Level (e.g. start at L2 and exclude L1 headers = only process headers from L2 - L6)
//      - Changed Beginning header Level to refer to the header level which is included (vs previously referred to 
//        level to be excluded).
//      - Added optional user dialogue to select 'Header Begin' Level (similar to the Header Level Depth dialogue). 
//      - Don't want to have the user dialogue pop up each time but there are occasions I want to change the beginning
//        header level. To make it easy to occasionally change the Beginning Header Level without a dialogue, a user 
//         can select a number 1-6 in their note and it will be used as the Beginning Header Level (the user dialogue 
//        will also be shown in this case to confirm the value and avoid false positives).
//   • Header Depth Limit: Changed variable name from 'header_limit' to 'levelDepth' for consistency with other header
//     depth variable names.
//   • Header Depth Limit & Header Begin Level: Added verification check to confirm levelDepth and headerBegin are 
//     within expected limits, and do not conflict with each other.
// ------------------------
// LINKS
// • Templater discussion: https://github.com/SilentVoid13/Templater/discussions/888
// • v3.3 (THIS VERSION): https://github.com/SilentVoid13/Templater/discussions/888#discussioncomment-15032675
// • v3.2: https://github.com/SilentVoid13/Templater/discussions/888#discussioncomment-14206273
// • v3.1: https://github.com/SilentVoid13/Templater/discussions/888#discussioncomment-14188879
// • v3.0: https://github.com/SilentVoid13/Templater/discussions/888#discussioncomment-7204381
// • nullcodee's version: https://github.com/nullcubee/obsidian-templater-toc/tree/main
//=====================================================================================================================================================================
//
// =======================
// CUSTOMISE FUNCTIONALITY
// =======================
//
// DEBUG MESSAGES
// Write useful debugging messages to console (Ctrl+Shift+i)
const deBug = false;
//
// TOC LOCATION
// If a TOC already exists it will be updated in the same location.
// If no existing TOC then default location is top of file (below any frontmatter). OR...
//   - Insert TOC below first header instead of top of file
const insertBelowHeader = true;
//   - Insert TOC at cursor position instead of top of file or below first header (overrides insertBelowHeader=true)
const insertAtCursor = false;
//
// TOC LINKS STYLE
// Swap to using Wiki-style syntax for TOC links. By default links in TOC use the Markdown syntax.
var useWikilinks = false;
//
// HEADERS TO PROCESS - DISABLE LEVEL PROMPT
// Disable prompt for user to select header level depth to use in TOC.
var levelDepthPromptDisable = true;
//
// HEADERS TO PROCESS - DEFAULT LEVEL
// Set default level depth too (1-6).
var levelDepthDefault = "6";
//
// HEADERS TO PROCESS - DISABLE MINIMUM LEVEL PROMPT
// Disable prompt for user to select the minimum header level (headerBegin) to use in TOC.
var headerBeginPromptDisable = true;
//
// HEADERS TO PROCESS - BEGINNING HEADER LEVEL
// The TOC will not include any headers higher than this level (1-6).
// e.g headerBegin=1 means all headers will be included; 2 means exclude H1; 3 means exclude H1 and H2; etc
// Beginning Header Level can also be assigned by selecting a number 1-6 in the note when the template is triggered
//    (the user confirmation dialogue will appear in this case to confirm value to be used and avoid false positives).
var headerBeginDefault = "2";
//
// TOC STYLE - USE CALLOUT OR HEADER
// Set to true to use a standard list with a header style instead of the regular callout style.
var useHeader = false;
//
// TOC STYLE - HEADER TITLE
// Set to desired header level and text (when using headers)
const headerTOCstart = "## Table of Contents";
//
// TOC STYLE - CALLOUT TITLE
// Set to desired callout name/style (when using callouts)
const calloutTOCstart = `> [!SUMMARY]+ **Table of Contents**`;
//
// TOC STYLE - TOC HEADER FUZZY MATCHING
// Set to true to ignore markdown formatting and letter capitalisation (case) when searching for existing TOC header in the note. 
// (Helps avoid generating a second TOC in a file if we have only made minor changes to headerTOCstart or calloutTOCstart)
const tocStartFuzzyMatch = true;
//
// TOC STYLE - CALLOUT STYLE - EMPTY LINE BETWEEN TITLE AND TOC
// If set to true then an empty line will be aded to the callout following the callout title and before the TOC starts.
const calloutTitleSeparateNewLine = true;
//
// TOC END STRING
// Set to desired string to mark the end of the TOC section.
const markerTOCend = '';
//
// ADD SECTION MARKERS
// Set to true to add '---' section markers above and below the TOC (if they do not already exist). 
// Setting to 0 will not remove any existing separators.
const useSeparators = true;
//
// =====================================================================================================================================================================
// FUNCTIONS

// DEBUG REPORTING
// Utility function for displaying debugging info in console (Ctrl + Shift + I)
const debugLog = (label, data) => {
    if (typeof deBug !== 'undefined' && deBug) console.log(`${label} \n\n`, data);
};

// TOC START MARKER MATCHING
// • Function called when optional variable, tocStartFuzzyMatch=true.
// • Uses 'fuzzy' matching to compare TOC start marker to file content. I want to be able to adjust the marker in minor
//	 ways without regenerating a duplicate TOC in the note. 
// • If enabled, the below function normalizeForComparison() does:
//    - Custom Array Search: The implementation utilizes Array.prototype.findIndex() method instead of indexOf() to enable
//      custom comparison logic. This approach allows for sophisticated matching criteria beyond simple string equality.
//    - Fuzzy Matching Logic: When tocStartFuzzyMatch is enabled, both the search marker and each line in the document undergo
//      identical normalization processing before comparison, ensuring consistent matching regardless of formatting variations.
//	  - Case-Insensitive Comparison: The function converts all text to lowercase using toLowerCase() method, ensuring
//		  consistent case-insensitive matching.
//    - Markdown Cleansing:
//		- Bold/Italic: Removes **bold**, __bold__, *italic*, _italic_ formatting
//		- Strikethrough: Removes ~~strikethrough~~ formatting
//		- Code blocks: Removes inline code backticks and code block markers
//		- Links: Preserves link text while removing URL references
//		- Images: Completely removes image references
//		- Headers: Removes hash symbols from headers
//		- Callouts: Removes Obsidian-specific callout syntax like [!SUMMARY]+
//		- Lists: Removes bullet points and numbered list markers
//		- Blockquotes: Removes > markers
function normalizeForComparison(text) {
	return text
		// Remove bold/italic formatting
		.replace(/(\*\*|__)(.*?)\1/g, '$2')  // Bold: **text** or __text__
		.replace(/(\*|_)(.*?)\1/g, '$2')     // Italic: *text* or _text_
		// Remove strikethrough
		.replace(/~~(.*?)~~/g, '$1')
		// Remove inline code
		.replace(/`{1,3}(.*?)`{1,3}/g, '$1')
		// Remove links but keep link text
		.replace(/\[([^\]]*)\]\([^\)]*\)/g, '$1')
		// Remove images
		.replace(/!\[.*?\]\(.*?\)/g, '')
		// Remove blockquote markers
		.replace(/^>\s*/gm, '')
		// Remove list markers
		.replace(/^[\s]*[-*+]\s*/gm, '')
		.replace(/^[\s]*\d+\.\s*/gm, '')
		// Remove heading markers
		.replace(/^#+\s*/gm, '')
		// Remove callout markers like [!SUMMARY]+ 
		.replace(/\[![^\]]*\][+-]?\s*/g, '')
		// Normalize whitespace
		.replace(/\s+/g, ' ')
		.trim()
		// Convert to lowercase for case-insensitive comparison
		.toLowerCase();
}
// Function to find TOC start position with fuzzy matching support
function findTOCStart(fileContentSplit, markerTOCstart, useFuzzy = false) {
	if (!useFuzzy) {
		return fileContentSplit.indexOf(markerTOCstart);
	}
	
	// Normalize the search marker for fuzzy comparison
	const normalizedMarker = normalizeForComparison(markerTOCstart);
	
	// Use findIndex for custom comparison logic
	return fileContentSplit.findIndex(line => {
		const normalizedLine = normalizeForComparison(line);
		return normalizedLine === normalizedMarker;
	});
}

// =====================================================================================================================================================================
// FRONTMATTER KEYS
// Usable keys: 
//   - toc-start-level = 1-6 = headerBeginDefault
//   - toc-start-level-prompt = true | false = headerBeginPromptDisable
//   - toc-depth = 1-6 = levelDepthDefault
//   - toc-depth-prompt = true | false = levelDepthPromptDisable
//   - toc-links-style = wikilinks | markdown = useWikilinks
//   - toc-style = callout | header = useHeader

var frontmattterInfoMessage = "";
var frontmatterErrorMessage = "";
var tocFrontmatterValue = null;
var tocFontmatterKey = null;
const frontmatter = tp.frontmatter;

tocFrontmatterValue = null;
tocFontmatterKey = "toc-start-level";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// validate value is a number between 1-6
	if (isNaN(Number(tocFrontmatterValue))) {
		// Not a number
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not a number.\n";
	} else if (Number(tocFrontmatterValue) < 1 || Number(tocFrontmatterValue) > 6) {
		// Number outside range
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is outside the allowed range of 1 to 6.\n";
	} else {
		// change headerBeginDefault to match key value - we change the Default value since
		// we use the default value to set the actual value in script below.
		headerBeginDefault = Number(frontmatter[tocFontmatterKey]);
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting TOC headers to begin at: " + headerBeginDefault + ".\n";
		// Disable header level prompt
		var headerBeginPromptDisable = true;
	}
}

tocFrontmatterValue = null;
tocFontmatterKey = "toc-start-level-prompt";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// Check if value is either 'true' or 'false'
	if (tocFrontmatterValue === true) {
		headerBeginPromptDisable = false;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - explicitly enabling enabling user prompt.\n";
	} else if ( tocFrontmatterValue === false) {
		headerBeginPromptDisable = true;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - explicitly disabling enabling user prompt.\n";
	} else {
		// Value not valid
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not 'true' or 'false'.\n";
	}
}

tocFrontmatterValue = null;
tocFontmatterKey = "toc-depth-level";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// validate value is a number between 1-6
	if (isNaN(Number(tocFrontmatterValue))) {
		// Not a number
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not a number.\n";
	} else if (Number(tocFrontmatterValue) < 1 || Number(tocFrontmatterValue) > 6) {
		// Number outside range
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is outside the allowed range of 1 to 6.\n";
	} else {
		// change headerBeginDefault to match key value - we change the Default value since
		// we use the default value to set the actual value in script below.
		levelDepthDefault = Number(frontmatter[tocFontmatterKey]);
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting TOC depth to header level: " + headerBeginDefault +".\n";
		// Disable header level prompt
		var levelDepthPromptDisable = true;
	}
}

tocFrontmatterValue = null;
tocFontmatterKey = "toc-depth-level-prompt";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// Check if value is either 'true' or 'false'
	if (tocFrontmatterValue === true) {
		levelDepthPromptDisable = false;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - explicitly enabling enabling user prompt.\n";
	} else if ( tocFrontmatterValue === false) {
		levelDepthPromptDisable = true;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - explicitly disabling enabling user prompt.\n";
	} else {
		// Value not valid
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not 'true' or 'false'.\n";
	}
}

tocFrontmatterValue = null;
tocFontmatterKey = "toc-links-style";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// Check if value is either 'wikilinks' or 'markdown'
	if (tocFrontmatterValue === "wikilinks") {
		// change useWikilinks to match specified key value
		useWikilinks = true;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting link style to: wikilinks.\n";
	} else if ( tocFrontmatterValue === "markdown") {
		// change useWikilinks to match specified key value
		useWikilinks = false;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting link style to: markdown.\n";
	} else {
		// Value not valid
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not 'wikilinks' or 'markdown'.\n";
	}
}

tocFrontmatterValue = null;
tocFontmatterKey = "toc-style";
if (tocFontmatterKey in frontmatter && frontmatter[tocFontmatterKey] !== undefined) {
	tocFrontmatterValue = frontmatter[tocFontmatterKey];
	// Check if value is either 'header' or 'callout'
	if (tocFrontmatterValue === "header") {
		// change useHeader to match specified key value
		useHeader = true;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting TOC style to: header.\n";
	} else if ( tocFrontmatterValue === "callout") {
		// change useHeader to match specified key value
		useHeader = false;
		frontmattterInfoMessage += "• '" + tocFontmatterKey + "' found in frontmatter - setting TOC style to: callout.\n";
	} else {
		// Value not valid
		frontmatterErrorMessage += "• Found '" + tocFontmatterKey + "' in frontmatter but value is not 'header' or 'callout'.\n";
	}
}

if (frontmattterInfoMessage !== undefined && frontmattterInfoMessage !== null && frontmattterInfoMessage !== "") {
	new Notice("TOC GENERATION: FRONTMATTER SETTINGS\n" + frontmattterInfoMessage, 15000);
}
if (frontmatterErrorMessage !== undefined && frontmatterErrorMessage !== null && frontmatterErrorMessage !== "") {
	new Notice("ERROR!!! TOC FRONTMATTER\n" + frontmatterErrorMessage, 15000);
}

// =====================================================================================================================================================================
// USER DIALOGUES

// If you want a dropdown selection instead of free-text, use `tp.system.suggester`:
//let input = await tp.system.suggester(["1", "5", "other"], ["1", "5", "other"]);

// BEGINNING HEADER LEVEL
// Check if user has selected a number when template is triggered, and if between 1-6
let textSelection = tp.file.selection();
if (textSelection && !isNaN(textSelection) && Number(textSelection) >= 1 && Number(textSelection) <= 6) {
  new Notice("INFO: TOC GENERATION \n" + "Valid number between 1-6 selected when template triggered (" + textSelection + "), setting value as Beginning Header Level,\n" + "Showing confirmation dialogue...", 5000);
  // Trigger user confirmation dialogue for Begin Header Level & set default value to the value in selected text.
  var headerBeginPromptDisable = false;
  var headerBeginDefault = textSelection;
  // Delete selected number in Obsidian note
  tR = "";
} else {
  // Don't need a message to notify when no text selected
  //new Notice("INFO: TOC GENERATION \n" + "Text selected when template triggered but not a valid number between 0-5. Not using for Beginning Header Level.", 5000);
}
// Get starting header level from user with dialogue (or confirm value from selected text)
let headerBegin = headerBeginDefault;
if (!headerBeginPromptDisable) headerBegin = await tp.system.prompt("BEGINNING HEADER LEVEL: \n" + "Select top level of headers to show in TOC. Headers above this level will be excluded (1-6)?\n" + "(e.g. '3' means exclude H1-H2, and include H3-H6)", headerBeginDefault);
if (headerBegin < 1 || headerBegin > 6) {
    new Notice("ERROR: TOC GENERATION \n" + "Beginning Header Level is set to: " + headerBegin + "\n" + "Value must be between 1-6", 10000);
    return;
}

// HEADER DEPTH
// Get header limit from user with dialogue
let levelDepth = levelDepthDefault;
if (!levelDepthPromptDisable) levelDepth = await tp.system.prompt("HEADER LEVEL DEPTH: \n" +"Show TOC down to which header level (1-6)?", levelDepthDefault);
if (levelDepth < 1 || levelDepth > 6) {
    new Notice("ERROR: TOC GENERATION \n" + "Header Depth Level is set to: " + levelDepth + "\n" + "Value must be between 1-6", 10000);
    return;
}

// CHECK BEGIN DEPTH AND HEADER DEPTH DO NOT CONFLICT
// If levelDepth <= 
if (levelDepth < headerBegin) {
    new Notice("ERROR: TOC GENERATION \n" + "Conflicting Beginning Header Level value (" + headerBegin + ") and Header Depth Level value (" + levelDepth + ").\n" + "Header depth must be bigger than beginning header level", 10000);
    return;
}

// =====================================================================================================================================================================
// USER INFORMATON NOTIFICATION

// Notify user of settings used: Notice(message,duration) - Duration optional (ms), default is 4000ms.
//new Notice("Generating Table Of Contents...\n" + "This is a second line\n" + "This line shows value of 'useSeparators': " + useSeparators, 5000); 

// Create array for notification content
let displayLines = [];

// Title
displayLines.push("Generating: Table Of Contents ..."); 
// TOC Position
//   - If no existing TOC then default location is top of file (below any frontmatter).
//   - Insert TOC below first header instead of top of file: insertBelowHeader (bool)
//   - Insert TOC at cursor position instead of top of file or below first header (overrides insertBelowHeader=true): insertAtCursor (bool)
if (insertAtCursor) {
	displayLines.push("• Position (if no existing TOC): " + "Cursor"); 
} else if (insertBelowHeader) {
	displayLines.push("• Position (if no existing TOC): " + "Below 1st Header"); 
} else {
	displayLines.push("• Position (if no existing TOC): " + "Top Of File"); 
}
// Make style user readable
if (useHeader) {
	displayLines.push("• Style: " + "Heading"); 	
} else {
	displayLines.push("• Style: " + "Callout"); 	
}
// Make link style user readable
if (useWikilinks) {
	displayLines.push("• Link Style: " + "Wikilinks"); 
} else {
	displayLines.push("• Link Style: " + "Markdown"); 
}
// Section separator
displayLines.push("• Section Separators: " + useSeparators); 
// Beginning Header Level
if (headerBegin < 2) {
	displayLines.push("• Headers Begin at: H" + headerBegin + " (all headers included)");
} else {
	displayLines.push("• Headers Begin at: H" + headerBegin + " (exclude H" + (headerBegin - 1) + " and above)"); 
}
// If levelDepth <6 change msg
if (levelDepth < 6) {
	displayLines.push("• Header Limit: H" + levelDepth + " (exclude H" + (Number(levelDepth) + 1) + " and below)"); 
} else {
	displayLines.push("• Header Limit: H" + levelDepth + " (all headers included)"); 
}
// Status of fuzzy marker matching
if (tocStartFuzzyMatch) {
	displayLines.push("• TOC Marker Matching: " + "Fuzzy"); 	
} else {
	displayLines.push("• TOC Marker Matching: " + "Precise"); 	
}
// Display notification
new Notice(displayLines.join('\n'), 10000);

// =====================================================================================================================================================================

// Log Obsidian info
debugLog("tp", tp);
debugLog("app", app);

// Get cursor position in case needed for TOC placement
let curPosition = this.app.workspace.activeLeaf.view.editor.getCursor().line;
debugLog("Cursor position", curPosition);

// Constants for TOC markers
if (useHeader) {
	var markerTOCstart = headerTOCstart;
} else {
	var markerTOCstart = calloutTOCstart;
}

// Get the active file info and its metadata
const activeFile = await this.app.workspace.getActiveFile();
const mdCache = await this.app.metadataCache.getFileCache(activeFile);

// Show file info
debugLog("File Info - activeFile:", activeFile);
//debugLog("File Info - tp.config.active_file", tp.config.active_file); // Matches 'activeFile' above
//debugLog("File Info - app.workspace.activeLeaf.view.file", app.workspace.activeLeaf.view.file); // Matches 'activeFile' above
debugLog("File Info - tp.file.find_tfile", tp.file.find_tfile(tp.file.title)); // Matches 'activeFile' above
debugLog("File Cache - mdCache:", mdCache); // Metadata
debugLog("Filename - tp.config.active_file.name", tp.config.active_file.name); // Filename

// Get the current file content and split it into lines
const fileContent = await tp.file.content;
const fileContentSplit = fileContent.split('\n');

// Check if the file starts with a YAML frontmatter block
// hasYAML is a bool matching evaluation of the two conditionals i.e. will be true if
// (the first line in file = '---') AND (if the next occurrence of '---' is on line > 0, start looking from line 1)
let hasYAML = fileContentSplit[0] === '---' && fileContentSplit.indexOf('---', 1) > 0;
// yamlEndLine equals the left hand side of ':' expression if hasYAML is true, and right hand side if hasYAML is false.
// if hasYAML is true then yamlEndLine = first occurrence of '---' in array holding file lines start looking at index 1
// if hasYAML is false then yamlEndLine = -1
let yamlEndLine = hasYAML ? fileContentSplit.indexOf('---', 1) : -1;
debugLog("First line in file", fileContentSplit[0]); // First line in file
debugLog("First line = '---' in file line array", fileContentSplit.indexOf('---')); // Find first occurrence of '---' in array holding file lines
debugLog("First line = '---' in file line array, start line 2", fileContentSplit.indexOf('---', 1)); // Find first occurrence of '---' in array holding file lines start looking at index 1
debugLog("hasYAML", hasYAML);
debugLog("yamlEndLine", yamlEndLine);

// Find existing TOC start and end positions (old method using exact matches)
//let TOCstart = fileContentSplit.indexOf(markerTOCstart);
// Find existing TOC start position using fuzzy matching if enabled
let TOCstart = findTOCStart(fileContentSplit, markerTOCstart, tocStartFuzzyMatch);
let TOCend = fileContentSplit.indexOf(markerTOCend, TOCstart); // Start looking for occurrence after the array element holding start marker.
debugLog("TOCstart", TOCstart);
debugLog("TOCend", TOCend);

// Remove existing TOC if it exists
// Removes the TOC section from array of file lines
// array.splice(X,Y) removes Y elements starting at position X.
if (TOCstart !== -1 && TOCend !== -1) {
	//fileContentSplit.splice(TOCstart, TOCend - TOCstart + 1);
	// Updated to also remove empty line at start/end of TOC which we added
	fileContentSplit.splice(TOCstart - 1, TOCend - TOCstart + 2);
	debugLog("Remove existing TOC", (TOCend - TOCstart + 2) + "lines, starting at line " + (TOCstart - 1) + " (line numbers are zero-indexed)");
}

// Initialize an empty array to hold new TOC lines
let newTOC = [];

// Get list of headings from file metadata
const mdCacheListItems = mdCache.headings;
debugLog("Headers", mdCacheListItems);

// Setup TOC start and define char for each line beginning based on whether header or callout being used
if (useHeader) {
	var lineBegin = ``;
	newTOC.push(``);
	debugLog("TOC Style", "header");
} else {
	var lineBegin = `> `;
	debugLog("TOC Style", "callout");
}
// If using callout style, add empty line below callout title?
if (!useHeader && calloutTitleSeparateNewLine) {
	newTOC.push(`> `);
}

// Parse headings and create new TOC
if (mdCacheListItems && mdCacheListItems.length > 0) {
	// Generate new TOC
	mdCacheListItems.forEach(item => {
		// If link is being used in header then replace link with display text
		// Use regexr.com for an explanation of regex
		//var header_text = item.heading;
		var header_text = item.heading
			.replace(/\[\[(?:[^\|\n]*?\|)?(.*?)\]\]/g, '$1') // Strip wikilinks
			.replace(/\[(.*?)\]\(.*?\)/g, '$1'); // Strip markdown links
	
		// Calc TOC indent for this header (account for headerBegin variable)
		var header_level = item.level;
		let indent_num = header_level - headerBegin;
		debugLog("Indent Number", indent_num + ' (' + header_text + ')' );
	    
		if (header_level < headerBegin) {
			// Ignore headers less than or equal to the minimum header number
		} else if (header_level <= levelDepth) {
			// Parse header if level not lower than defined levelDepthDefault variable
			if (useWikilinks) {
				// WIKI-STYLE
				let file_title = tp.file.title;
				// Strip special characters from header_url
				//let header_url = item.heading;         
				let header_url = item.heading
					.replace(/\[|\]/g, '')
					.replace(/\|/g, ' ');
				// Create TOC link
				var header_link = `[[${file_title}#${header_url}|${header_text}]]`;
			} else {
				// MARKDOWN-STYLE 
				// Use proper URI encoding function instead of trying to brute force with manual char replacements
				// File path part of TOC link
				var file_title = encodeURIComponent(tp.file.title);   // Generate URI encoded file path part of markdown link
				var file_title = file_title.replace(/%26/g, '&');   // Restore '&' character from URI encoding as using the encoded character breaks links for some reason.
				var file_title = file_title.replace(/%2C/g, ',');   // Restore ',' character from URI encoding as using the encoded character breaks links for some reason.
	
				// Header part of TOC link
				// Some URI replacements do not work in the TOC links. We can either remove the character before doing URI conversion, or 
				// we can revert the URI encoded character back to the ascii version. 
				var header_url = item.heading;
				//var header_url = header_url.replace(/\/|;|:|\?|&|=/g, '');   // Remove some problematic characters from headers before encoding: ; ? & = / :
				//var header_url = header_url.replace(/ /g, '%20');    // Brute force URI encoding - replace spaces with '%20'
				var header_url = header_url.replace(/:/g, '');   // Remove character before doing URL conversion
				var header_url = encodeURIComponent(header_url);   // URI encoded heading
				var header_url = header_url.replace(/%26/g, '&');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%3B/g, ';');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%2F/g, '/');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%3D/g, '=');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%2B/g, '+');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%24/g, '$');   // Restore character from URI encoding as using the URI encoded character stops links working
				var header_url = header_url.replace(/%3F/g, '?');   // Restore character from URI encoding as using the URI encoded character stops links working
	
				// Create TOC link from file path and section header
				var header_link = `[${header_text}](${file_title}.md#${header_url})`;
			}
		//newTOC.push(`>${'    '.repeat(header_level - 1) + '- ' + header_link}`);
		newTOC.push(`${lineBegin}${'    '.repeat(indent_num) + '- ' + header_link}`);
		}
	});
}

// Add TOC start marker
// markerTOCstart was not previously added to newTOC itself and was prepended when outputting to the file, but 
// we need to include in the newTOC array so that we can also prepend section separators below if needed.
newTOC.unshift(markerTOCstart); 

// Add TOC end marker
// markerTOCend was not previously added to newTOC itself and was appended when outputting to the file, but 
// we need to include in the newTOC array so that we can also append section separators below if needed.
newTOC.push(``);
newTOC.push(markerTOCend);

// Determine where to insert the new TOC
// Order of definitions below ensures that TOC is placed in priority order of:
//   - Directly below frontmatter, or top of file if no frontmatter
//   - Directly below first header
//   - At cursor position if no existing TOC (if feature enabled at top of file)
//   - ALWAYS update existing TOC location if it exists
// Insert below frontmatter or top of file.
let insertPosition = hasYAML ? yamlEndLine + 2 : 0;    // Use +1 if not adding additional empty line to TOC before start marker
debugLog("insertPosition - frontmatter", insertPosition);
// Insert below first header
let firstHeaderFind = '#'.repeat(mdCacheListItems[0].level) + ' ' + mdCacheListItems[0].heading;
debugLog("First Header String", firstHeaderFind);
firstHeaderPosition = fileContentSplit.indexOf(firstHeaderFind) + 2;  // Use +1 if not adding additional empty line to TOC before start marker
debugLog("insertPosition - header", firstHeaderPosition);
if (insertBelowHeader) insertPosition = firstHeaderPosition;
// Insert at cursor position if feature enabled
debugLog("insertPosition - cursor", curPosition);
if (insertAtCursor)  insertPosition = curPosition;
// Insert at existing TOC location
debugLog("insertPosition - existing", TOCstart);
if (TOCstart !== -1) insertPosition = TOCstart;
// Log actual insert position
debugLog("insertPosition - ACTUAL", insertPosition);

// Determine whether section separators should be inserted
if (useSeparators) {
	// Check lines before TOC insert point to see if separator already exists.
	var separatorExistsBeforeTOC = false;  // Set default that separators not in use
	// insertPosition (top line of TOC body) must be >= 3, and must be inside overall line count, or there is no room for separator lines.
	if ( (insertPosition - 3) >= 0 && (insertPosition + 3) < fileContentSplit.length ) {
		const lineContentTOCMinusOne = fileContentSplit[insertPosition - 1].trim();  // If sep in use then should equal ''
		const lineContentTOCMinusTwo = fileContentSplit[insertPosition - 2].trim();  // If sep in use then should equal '---'
		const lineContentTOCMinusThree = fileContentSplit[insertPosition - 3].trim();  // If sep in use then should equal ''
		debugLog("useSeparator - lines before TOC", (insertPosition - 1) + ": " + lineContentTOCMinusOne);
		debugLog("useSeparator - lines before TOC", (insertPosition - 2) + ": " + lineContentTOCMinusTwo);
		debugLog("useSeparator - lines before TOC", (insertPosition - 3) + ": " + lineContentTOCMinusThree);
		if (lineContentTOCMinusOne === '' && 
			lineContentTOCMinusTwo === '---' && 
			lineContentTOCMinusThree === '') {
			var separatorExistsBeforeTOC = true;
		}
	} else {
		debugLog("useSeparator - separator before TOC", "TOC insertion line # <= 2 so no room for separator lines");	
	}
	debugLog("useSeparator - separator already exists before TOC?", separatorExistsBeforeTOC);
	// Add separator to start of TOC array if it doesn't already exist
	if (!separatorExistsBeforeTOC) {
		newTOC.unshift('');
		newTOC.unshift('---');
		newTOC.unshift('');
	}
	
	// Existing TOC is removed from file in code above, so we still use the 'insertPosition' line number to check for 
	// existence of section separators (vs TOCend variable). 'insertPosition' is zero-indexed so insertPosition actually
	// refers to what will become the line after the body of the TOC.
	var separatorExistsAfterTOC = false;  // Set default that separators not in use
	// insertPosition (top line of TOC body) must be >= 3, and must be inside overall line count, or there is no room for separator lines.
	if ( (insertPosition - 3) >= 0 && (insertPosition + 3) < fileContentSplit.length ) {
		const lineContentTOCPlusOne = fileContentSplit[insertPosition - 1].trim();  // If sep in use then should equal ''
		const lineContentTOCPlusTwo = fileContentSplit[insertPosition].trim();  // If sep in use then should equal '---'
		const lineContentTOCPlusThree = fileContentSplit[insertPosition + 1].trim();  // If sep in use then should equal ''
		debugLog("useSeparator - lines after TOC", (insertPosition - 1) + ": " + lineContentTOCPlusOne);
		debugLog("useSeparator - lines after TOC", (insertPosition) + ": " + lineContentTOCPlusTwo);
		debugLog("useSeparator - lines after TOC", (insertPosition + 1) + ": " + lineContentTOCPlusThree);
		if (lineContentTOCPlusOne === '' && 
			lineContentTOCPlusTwo === '---' && 
			lineContentTOCPlusThree === '') {
			var separatorExistsAfterTOC = true;
		}
	} else {
		debugLog("useSeparator - separator already exists after TOC?", separatorExistsAfterTOC);
	}
	// Add separator to end of TOC array if it doesn't already exist
	if (!separatorExistsAfterTOC) {
		newTOC.push('');
		newTOC.push('---');
		newTOC.push('');
	}
	
	// If insertPosition is at the start of the file (index 0), then fileContentSplit[insertPosition - 1] will be undefined. The conditional checks protect against errors.
	//	- need to add check for existence first
	
	// If insertPosition is at the end of the file, ensure you handle file boundaries appropriately.
	//	- need to add check for existence first
	
	// What do we use if no pre-existing TOC?

}

// Add or remove TOC based on newTOC's content
// Note the '...newTOC' used to insert TOC. This is called the 'spread operator' and expands
//    the item to individual values.
if (newTOC.length > 0) {
	// Insert the new TOC into the file content
	//fileContentSplit.splice(insertPosition, 0, markerTOCstart, ...newTOC, "", markerTOCend);
	// Updated with an empty line before start marker, we need to adjust insert location to compensate
	//fileContentSplit.splice(insertPosition-1, 0, "", markerTOCstart, ...newTOC, "", markerTOCend);
	// Updated since newTOC already includes markerTOCstart & markerTOCend - we added these to newTOC array itself to enable
	// adding section separators to array if enabled.
	fileContentSplit.splice(insertPosition-1, 0, "", ...newTOC);
} else if (TOCstart !== -1 && TOCend !== -1) {
	// Remove the markers when there are no headers
	fileContentSplit.splice(TOCstart, TOCend - TOCstart + 1);
}
debugLog("TOC:", newTOC);

// Update the file with the new content
await app.vault.modify(activeFile, fileContentSplit.join('\n'));

// Also trigger Obsidian Linter - mainly to update 'Modified' timestamp since frequently forget to actually save a file and more often will update the TOC so make sense to trigger Linter from here. Seemed to work without the 'Promise' syntax but apparently it will help make sure the Lint doesn't happen until after templater updates the file to avoid race conditions.
// See: https://github.com/SilentVoid13/Templater/issues/948#issuecomment-1763249617
new Promise(r => setTimeout(r, 100)).then(() => {
	app.commands.executeCommandById("obsidian-linter:lint-file")
});
%>
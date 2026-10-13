---
{"Publish":true,"permalink":"/template/daily/","hideInGraph":true,"noteIcon":"Biohazard_symbol.svg","dg-note-properties":{"Icon":"[[Files And Shit/CalendarRange.svg]]","Featured":"","Yesterday":null,"Tomorrow":null}}
---


# <center><span style="color:#AAAAFF">{{date}}</span></center>

<p><span><strong>Day Age</strong>     <progress max="100" value="71.04513888888889" style="height:10px;width:20%"></progress>    71.04513888888889 </span></p>


```
<%*
// Define the format of the path to a daily note
const { folder, format } =
  tp.app.internalPlugins.getEnabledPluginById("daily-notes").options;
const pathFormat = `[${folder}]/${format}`;
// Define function to generate a link
function generateLink (note, sourcePath) {
    if (!note) return null;
    return tp.app.fileManager.generateMarkdownLink(
        note,
        sourcePath,
    );
}
// Get all daily notes
const dailyNotes = tp.app.vault
    .getMarkdownFiles()
    .filter(file => file.path.startsWith(folder));
const notice = new Notice('', 0);
// Loop over daily notes
for (let i = 0; i < dailyNotes.length; i++) {
    const dailyNote = dailyNotes[i];
    notice.setMessage(
        `Processing: ${dailyNote.path}\n` +
        `Progress: ${i}/${dailyNotes.length}`,
    );
    // Retrieve the date from the daily note
    const date = moment(dailyNote.path, pathFormat);
    // Get the most recent daily note before the current note
    const Yesteday = dailyNotes
        .filter(file => moment(file.path, pathFormat).isBefore(date))
        .sort((a, b) => moment(b.path, pathFormat).diff(moment(a.path, pathFormat)))
        .at(0);
    // Get the earliest daily note after the current note
    const Tomorrow = dailyNotes
        .filter(file => moment(file.path, pathFormat).isAfter(date))
        .sort((a, b) => moment(a.path, pathFormat).diff(moment(b.path, pathFormat)))
        .at(0);
    // Update the links
    await tp.app.fileManager.processFrontMatter(dailyNote, (fm) => {
        fm.Yesteday = generateLink(Yesteday, dailyNote.path);
        fm.Tomorrow = generateLink(Tomorrow, dailyNote.path);
    });
}
notice.setMessage('Processing complete');
await new Promise(r => setTimeout(r, 2000));
notice.hide();
-%>
```


---
## Last Night:
- 



## Todays Plans:
- [ ] 

### Tomorrow

## Stats

### Health

Blood Pressure Dia::  
Blood Pressure Sys::  
Heart Rate::
Steps::

### Games

## Food

### Breakfast


### Dinner

## To-Dos

## General

## Imported




<center><small>And That Is All Folks</small></center>
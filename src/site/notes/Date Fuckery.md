---
{"dg-publish":true,"permalink":"/date-fuckery/","tags":["Tagless"],"dgShowToc":true,"noteIcon":"Biohazard_symbol.svg","dg-note-properties":{"Type":null,"Up":null,"Down":null,"Yesterday":null,"Tomorrow":null,"Embedded":null,"Next":null,"Previous":null,"aliases":null,"Title":null,"comments":true,"tags":["Tagless"],"Similarly Rooted":null,"Date Created":null,"Session Number":null,"Icon":null,"Banner":null}}
---

<style id="Force_Custom_Fonts" type="text/css">@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}:not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var){font-family:"Merriweather"!important}pre,code,textarea,tt,kbd,samp,var{font-family:monospace!important}pre *,code *,textarea *,tt *,kbd *,samp *,var *{font-family:monospace!important}
 img{
 float: right;
}
</style>


# <center><span style="color:#FFDCAA"></span></center>











<center><sub>Done :)</sub></center><style id="Force_Custom_Fonts" type="text/css">@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}:not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var){font-family:"Merriweather"!important}pre,code,textarea,tt,kbd,samp,var{font-family:monospace!important}pre *,code *,textarea *,tt *,kbd *,samp *,var *{font-family:monospace!important}
 img{
 float: right;
}
</style>


# <center><span style="color:#FEDCBA"></span></center>


Date Countdown Progress Bar
<pre class="dataview dataview-error">Evaluation Error: SyntaxError: Invalid left-hand side expression in postfix operation
    at DataviewInlineApi.eval (plugin:dataview:19027:21)
    at evalInContext (plugin:dataview:19028:7)
    at asyncEvalInContext (plugin:dataview:19038:32)
    at DataviewJSRenderer.render (plugin:dataview:19064:19)
    at DataviewJSRenderer.onload (plugin:dataview:18606:14)
    at DataviewJSRenderer.load (app://obsidian.md/app.js:1:883194)
    at DataviewApi.executeJs (plugin:dataview:19607:18)
    at DataviewCompiler.eval (plugin:digitalgarden:13372:21)
    at Generator.next (&lt;anonymous&gt;)
    at eval (plugin:digitalgarden:105:61)</pre>



```javascript
var now = moment();
```

```js
function getDatePercent() {
  let dateInQuestion = new Date(Date.now())

    let startOfDay = new Date(dateInQuestion.valueOf())
    
    //define the beginning of the day. Depending on time zone and browser, this may need tweaking:
    startOfDay.setHours(0)
    startOfDay.setMinutes(0)
    startOfDay.setSeconds(0)
    startOfDay.setMilliseconds(0)

    let lengthOfDay = 1000 * 60 * 60 * 24 //ms in a day

    //subtract to find time since beginning of the day, divide by
    //number of ms in day, and then multiply by 100 to get percentage
    return ( dateInQuestion.valueOf() - startOfDay.valueOf() ) / lengthOfDay * 100
}

console.log(getDatePercent())
```



<p><span><strong>Day %age</strong>     <progress max="100" value="61.09375" style="height:10px;width:20%"></progress></span></p>


[[[Skull/Concentrated Brain/Journaling Before It Gets Amalgamated/10·2026/283·10·2026 (Saturday).md\|283·10·2026 (Saturday)]]]



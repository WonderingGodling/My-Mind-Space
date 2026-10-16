---
{"Type":null,"Up":null,"Down":null,"Yesterday":null,"Tomorrow":null,"Embedded":null,"Next":null,"Previous":null,"aliases":[],"Title":null,"comments":true,"Publish":true,"dg-show-local-graph":null,"tags":["Tagless"],"dg-show-toc":true,"dg-hide-in-graph":null,"Permalink":null,"Similarly Rooted":null,"Date Created":"200·2026 12:36:08 (Sunday)","Session Number":null,"Icon":"Skull/Concentrated Brain/Journaling Before It Gets Amalgamated/10·2026/Files And Shit/fish-off.svg","Banner":null,"Date Modified":"288·2026 18:4:56 (Thursday)","permalink":"/date-fuckery/","dgShowToc":true,"dgPassFrontmatter":true,"updated":"288·2026 18:4:56 (Thursday)","dg-note-properties":{"Type":null,"Up":null,"Down":null,"Yesterday":null,"Tomorrow":null,"Embedded":null,"Next":null,"Previous":null,"aliases":[],"Title":null,"comments":true,"tags":["Tagless"],"Similarly Rooted":null,"Date Created":"200·2026 12:36:08 (Sunday)","Session Number":null,"Icon":null,"Banner":null,"Date Modified":"288·2026 18:4:56 (Thursday)"}}
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

<p><span><strong>COUNTDOWN</strong>     <progress max="162" value="0" style="height:10px;width:20%"></progress>    <strong>0%</strong> | 7 days remaining</span></p>

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

<p><span><strong>Day %age</strong>     <progress max="100" value="24.89351851851852" style="height:10px;width:20%"></progress></span></p>

<p><span> 6472 </span></p>

[[[Skull/Concentrated Brain/Journaling Before It Gets Amalgamated/289·2026 (Friday).md\|289·2026 (Friday)]]]

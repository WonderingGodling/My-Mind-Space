---
{"dg-publish":true,"permalink":"/template/untitled/","tags":["Tagless"]}
---

<style id="Force_Custom_Fonts" type="text/css">@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}:not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var){font-family:"Merriweather"!important}pre,code,textarea,tt,kbd,samp,var{font-family:monospace!important}pre *,code *,textarea *,tt *,kbd *,samp *,var *{font-family:monospace!important}</style>


# <center><span style="color:#000000"></span></center>




<title>PASSWORD</title>

<body>

  <div class="div1">
    <div class="div2">


<html>
<head>
    <title>Login page</title>
</head>
<body>
<form>
    <label for="pswd">Enter your password: </label>
    <input type="password" id="pswd">
    <input type="button" value="Submit" onclick="checkPswd();" />
</form>
<!--Function to check password the already set password is admin-->
<script type="text/javascript">
    function checkPswd() {
        var confirmPassword = "admin";
        var password = document.getElementById("pswd").value;
        if (password == confirmPassword) {
             window.location="welcome.html";
        }
        else{
            alert("Passwords do not match.");
        }
    }
</script>
</body>
</html>
```
faefa
Fae,fgm
    Gaegmpoi

    </div>
  </div>
</body>








<center><sub>Done :)</sub></center>


<script src="https://utteranc.es/client.js"
        repo="WonderingGodling/My-Mind-Space"
        issue-term="title"
        theme="preferred-color-scheme"
        crossorigin="anonymous"
        async>
</script>
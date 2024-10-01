---
{"dg-publish":true,"permalink":"/template/untitled/","tags":["Tagless"],"noteIcon":""}
---

<style id="Force_Custom_Fonts" type="text/css">@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}:not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var){font-family:"Merriweather"!important}pre,code,textarea,tt,kbd,samp,var{font-family:monospace!important}pre *,code *,textarea *,tt *,kbd *,samp *,var *{font-family:monospace!important}</style>


<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Auto-start Stopwatch</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            text-align: center;
            margin-top: 50px;
        }
        #stopwatch {
            font-size: 48px;
            color: #333;
        }
    </style>
</head>
<body>
    <h1>Stopwatch</h1>
    <div id="stopwatch">00:00:00</div>

    <script>
        let startTime = Date.now();

        function updateStopwatch() {
            const currentTime = Date.now();
            const elapsedTime = currentTime - startTime;

            const hours = Math.floor(elapsedTime / 3600000);
            const minutes = Math.floor((elapsedTime % 3600000) / 60000);
            const seconds = Math.floor((elapsedTime % 60000) / 1000);

            // Format the time with leading zeros
            const formattedHours = String(hours).padStart(2, '0');
            const formattedMinutes = String(minutes).padStart(2, '0');
            const formattedSeconds = String(seconds).padStart(2, '0');

            document.getElementById('stopwatch').textContent = `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
        }

        // Start the stopwatch immediately when the page loads
        setInterval(updateStopwatch, 1000);
    </script>
</body>
</html>












<center><sub>Done :)</sub></center>


<script src="https://utteranc.es/client.js"
        repo="WonderingGodling/My-Mind-Space"
        issue-term="title"
        theme="preferred-color-scheme"
        crossorigin="anonymous"
        async>
</script>
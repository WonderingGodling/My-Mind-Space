---
{"dg-publish":true,"permalink":"/explicitly-showcased/guestbook/","title":"Guestbook","tags":["Tagless"],"noteIcon":""}
---

<style id="Force_Custom_Fonts" type="text/css">@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather")}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF,U+2E80-9FFF,U+F900-FAFF,U+FE30-FE4F,U+20000-2FA1F}@font-face{font-style:normal;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}@font-face{font-style:bolder;font-family:"Merriweather";src:local("Merriweather");unicode-range:U+0-FF}:not(pre):not(code):not(textarea):not(tt):not(kbd):not(samp):not(var){font-family:"Merriweather"!important}pre,code,textarea,tt,kbd,samp,var{font-family:monospace!important}pre *,code *,textarea *,tt *,kbd *,samp *,var *{font-family:monospace!important}</style>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Register</title>
</head>
<body>
    <h2>Register</h2>
    <form action="/register" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Register</button>
    </form>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track Page Views</title>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Function to get the page view count from local storage
      function getPageViewCount() {
        return parseInt(localStorage.getItem('pageViewCount')) || 0;
      }

      // Function to increment the page view count and update local storage
      function incrementPageViewCount() {
        const currentCount = getPageViewCount();
        localStorage.setItem('pageViewCount', currentCount + 1);
      }

      // Increment the page view count
      incrementPageViewCount();

      // Display the page view count
      const countDisplay = document.getElementById('pageViewCountDisplay');
      countDisplay.textContent = `You have viewed ${getPageViewCount()} pages on this site.`;
    });
  </script>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p id="pageViewCountDisplay"></p>
</body>
</html>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Track Page Views</title>
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      // Function to get the page view count from session storage
      function getPageViewCount() {
        return parseInt(sessionStorage.getItem('pageViewCount')) || 0;
      }

      // Function to increment the page view count and update session storage
      function incrementPageViewCount() {
        const currentCount = getPageViewCount();
        sessionStorage.setItem('pageViewCount', currentCount + 1);
      }

      // Increment the page view count
      incrementPageViewCount();

      // Display the page view count
      const countDisplay = document.getElementById('pageViewCountDisplay');
      countDisplay.textContent = `You have viewed ${getPageViewCount()} pages during this session.`;
    });
  </script>
</head>
<body>
  <h1>Welcome to My Website</h1>
  <p id="pageViewCountDisplay"></p>
</body>
</html>

# Guestbook!
Write [[Skull/Concentrated Brain/Poetry Apparently/Thing Trilogy/Something\|Something]] Dumb

# <a href="http://WonderingGodling.123Guestbook.com/" target="_self">My guestbook</a>
<div><iframe allowfullscreen="" width="100%" height="600px" frameborder="1" name="myiFrame" style="border:1px #000000 solid;" src="http://WonderingGodling.123Guestbook.com/" sandbox="allow-forms allow-modals allow-presentation allow-popups allow-same-origin allow-scripts"></iframe></div>
(If You Cant See Anything, Click The Title)


<center><sub>Done :)</sub></center>

<script src="https://utteranc.es/client.js"
        repo="WonderingGodling/My-Mind-Space"
        issue-term="title"
        theme="preferred-color-scheme"
        crossorigin="anonymous"
        async>
</script>

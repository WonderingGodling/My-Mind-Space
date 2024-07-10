---
{"dg-publish":true,"permalink":"/login/","tags":["Tagless"],"noteIcon":""}
---


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
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
</head>
<body>
    <h2>Login</h2>
    <form action="/login" method="post">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required><br><br>

        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required><br><br>

        <button type="submit">Login</button>
    </form>
</body>
</html>

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
  <h1></h1>
  <p id="pageViewCountDisplay"></p>
</body>
</html>

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

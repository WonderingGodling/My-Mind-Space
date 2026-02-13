---
{"dg-publish":true,"permalink":"/template/untitled/","tags":["Tagless"]}
---


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











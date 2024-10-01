---
{"dg-publish":true,"permalink":"/template/untitled/","tags":["Tagless"],"noteIcon":""}
---

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stopwatch</title>
    <style>
        #timer {
            font-size: 2em;
            margin: 20px;
        }
    </style>
</head>
<body>

<div id="timer">00:00</div>

<script>
    let stopwatch;
    let elapsedTime = 0;

    function startStopwatch() {
        clearInterval(stopwatch);
        stopwatch = setInterval(() => {
            elapsedTime++;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            document.getElementById('timer').innerText = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        }, 1000);
    }

</script>

</body>
</html>

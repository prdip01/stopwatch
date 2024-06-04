// script.js
let startTime, updatedTime, difference, tInterval, running = false;
let lapCounter = 0;
const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

startPauseButton.addEventListener('click', startPause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function startPause() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(getShowTime, 10);
        startPauseButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        startPauseButton.textContent = 'Start';
        running = false;
    }
}

function reset() {
    clearInterval(tInterval);
    display.textContent = '00:00:00.00';
    startPauseButton.textContent = 'Start';
    running = false;
    difference = 0;
    lapCounter = 0;
    lapTimesList.innerHTML = '';
}

function recordLap() {
    if (running) {
        const lapTime = document.createElement('li');
        lapTime.textContent = display.textContent;
        lapTimesList.appendChild(lapTime);
        lapCounter++;
    }
}

function getShowTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 10);
    display.textContent = 
        (minutes < 10 ? '0' : '') + minutes + ':' +
        (seconds < 10 ? '0' : '') + seconds + '.' +
        (milliseconds < 10 ? '0' : '') + milliseconds;
}

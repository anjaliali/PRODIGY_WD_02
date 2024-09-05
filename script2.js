let startTime = 0;
let updatedTime = 0;
let difference = 0;
let interval = null;
let isRunning = false;
let lapCounter = 1;

const timerDisplay = document.getElementById('timer');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapsContainer = document.getElementById('laps');

// Start the stopwatch
startButton.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - difference;
        interval = setInterval(updateTime, 10);
        isRunning = true;
    }
});

// Pause the stopwatch
pauseButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
        difference = Date.now() - startTime;
    }
});

// Reset the stopwatch
resetButton.addEventListener('click', () => {
    clearInterval(interval);
    startTime = 0;
    difference = 0;
    updatedTime = 0;
    isRunning = false;
    lapCounter = 1;
    timerDisplay.textContent = "00:00:00.000";
    lapsContainer.innerHTML = "";
});

// Add lap time
lapButton.addEventListener('click', () => {
    if (isRunning) {
        const lapTime = document.createElement('div');
        lapTime.textContent = `Lap ${lapCounter}: ${timerDisplay.textContent}`;
        lapsContainer.appendChild(lapTime);
        lapCounter++;
    }
});

// Update the time display
function updateTime() {
    updatedTime = Date.now() - startTime;
    
    let milliseconds = updatedTime % 1000;
    let seconds = Math.floor((updatedTime / 1000) % 60);
    let minutes = Math.floor((updatedTime / (1000 * 60)) % 60);
    let hours = Math.floor((updatedTime / (1000 * 60 * 60)) % 24);
    
    milliseconds = milliseconds < 100 ? "0" + milliseconds : milliseconds;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    minutes = minutes < 10 ? "0" + minutes : minutes;
    hours = hours < 10 ? "0" + hours : hours;
    
    timerDisplay.textContent = `${hours}:${minutes}:${seconds}.${milliseconds}`;
}

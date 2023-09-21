import { message } from "./message.js";
import { scores } from "./initCard.js";
let timerBox = document.querySelector(".timer-box");
let pauseResumeBtn = document.getElementById("PauseGame");
let startBtn = document.getElementById("StartGame"); // Get the start button
let totalSeconds = 3; // 3 minutes in seconds
let isPaused = false;
let timeIsup = false;

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;
    timerBox.textContent = (hours < 10 ? '0' + hours : hours) + ':' + 
                           (minutes < 10 ? '0' + minutes : minutes) + ':' + 
                           (seconds < 10 ? '0' + seconds : seconds);
}

let interval;

startBtn.addEventListener("click", function() {
    if (!interval) { // Check if interval is not already set
        isPaused = false; // Start the timer
        interval = setInterval(function() {
            if (!isPaused) {
                if (totalSeconds <= 0) {
                    clearInterval(interval);
                    message("Time Is Up. Nice work you find " + scores + " sets");
                    timeIsup = true;
                    return;
                }
                totalSeconds--;
                updateDisplay();
            }
        }, 1000);
        startBtn.disabled = true; // Disable the start button to prevent starting multiple intervals
    }
});

pauseResumeBtn.addEventListener("click", function() {
    isPaused = !isPaused;
    pauseResumeBtn.textContent = isPaused ? 'Continue Game' : 'Pause Game';
});

 export function isTimeUp() {
     return timeIsUp;
 }




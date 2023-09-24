import { message } from "./message.js";
import { userState, displayCards, setupClickListeners, cardClickListener, showDiv } from "./initCard.js";
let timerBox = document.querySelector(".timer-box");
let pauseResumeBtn = document.getElementById("PauseGame");
let startBtn = document.getElementById("StartGame"); // Get the start button
let isPaused = false;


function updateDisplay() {
    let hours = Math.floor(userState.totalSeconds / 3600);
    let minutes = Math.floor((userState.totalSeconds % 3600) / 60);
    let seconds = userState.totalSeconds % 60;
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
                if (userState.totalSeconds <= 0) {
                    clearInterval(interval);
                    //Message final result
                    message("Time Is Up. Nice work you find " + userState.scoreNum
                    + " sets");
                    displayCards(userState.cardsOnTable);
                    userState.gameIsActive = false;
                    showDiv();
                    return;
                }
                userState.totalSeconds--;
                updateDisplay();
            }
        }, 1000);
        startBtn.disabled = true; // Disable the start button to prevent starting multiple intervals
    }
});

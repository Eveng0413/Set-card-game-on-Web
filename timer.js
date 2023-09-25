import { message } from "./message.js";
import { userState, displayCards, setupClickListeners, cardClickListener, showDiv } from "./initCard.js";
let timerBox = document.querySelector(".timer-box");  // Get timer box
let startBtn = document.getElementById("StartGame"); // Get the start button

/** 
 * Update the content of timer
 * 
 * @param 
 * 
 * @returns 
 * 
 * @calls
 */
function updateDisplay() {
    let hours = Math.floor(userState.totalSeconds / 3600);
    let minutes = Math.floor((userState.totalSeconds % 3600) / 60);
    let seconds = userState.totalSeconds % 60;
    timerBox.textContent = (hours < 10 ? '0' + hours : hours) + ':' +
        (minutes < 10 ? '0' + minutes : minutes) + ':' +
        (seconds < 10 ? '0' + seconds : seconds);
}

let interval;

// add listener to start button
startBtn.addEventListener("click", function () {
    // Check if interval is not already set
    if (!interval) {
        // Start the timer
        interval = setInterval(function () {
            if (!userState.paused) {
                // check if time run up
                if (userState.totalSeconds <= 0) {
                    clearInterval(interval);
                    //Message final result
                    message("Time Is Up. Nice work you find " + userState.scoreNum
                        + " sets");
                    //remove listeners
                    displayCards(userState.cardsOnTable);
                    userState.gameIsActive = false;
                    //display
                    showDiv();
                    return;
                }
                userState.totalSeconds--;
                //Update the content of timer
                updateDisplay();
            }
        }, 1000);
        // Disable the start button to prevent starting multiple intervals
        startBtn.disabled = true; // Disable the start button to prevent starting multiple intervals
    }
});

export let paused = isPaused;
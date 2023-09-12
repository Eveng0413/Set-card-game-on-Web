let timerBox = document.querySelector(".timer-box");
let pauseResumeBtn = document.getElementById("pause-resume");
let resetBtn = document.getElementById("reset");

let totalSeconds = 5 * 60; // 5 minutes in seconds
let isPaused = false;

function updateDisplay() {
    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    timerBox.textContent = (hours < 10 ? '0' + hours : hours) + ':' + 
                           (minutes < 10 ? '0' + minutes : minutes) + ':' + 
                           (seconds < 10 ? '0' + seconds : seconds);
}

let interval = setInterval(function() {
    if (!isPaused) {
        if (totalSeconds <= 0) {
            clearInterval(interval);
            alert('Time is up!');
            return;
        }
        totalSeconds--;
        updateDisplay();
    }
}, 1000);

pauseResumeBtn.addEventListener("click", function() {
    isPaused = !isPaused;
    pauseResumeBtn.textContent = isPaused ? 'Continue' : 'Pause';
});

resetBtn.addEventListener("click", function() {
    totalSeconds = 5 * 60;
    isPaused = false;
    pauseResumeBtn.textContent = 'Pause';
    updateDisplay();
});

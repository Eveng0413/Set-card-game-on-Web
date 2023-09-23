
let startGame = document.getElementById("StartGame"); // Get the start button

startGame.addEventListener('click', function() {
    gameIsActive = true;
})


function startGame(cardsOnTable) {
    gameIsActive = true; // Set game to active mode
    setupClickListeners(cardsOnTable);
}
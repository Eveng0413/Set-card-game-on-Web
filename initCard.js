
import { findSet, cardReplacing } from './cardReplacing.js';
import { verifySet } from './verifySet.js';
import { message } from './message.js';
import { displayScore } from './ScoreBoard.js';

//initialize the card attributes array
const colorArr = ["blue", "green", "purple"];
const shapeArr = ["diamond", "oval", "squiggles"];
const numberArr = [1, 2, 3];
const shadingArr = ["open", "solid", "striped"];


//initialize state variable
let state = {
    cardsOnTable: [],
    shuffledDeck: [],
    userSelected: [],
    totalSeconds: 10,
    scoreNum: 0,
    gameIsActive: false,
    text: "test"
}


//construct the card into object
function Card(id, color, shape, number, shading) {
    this.id = id;
    this.color = color;
    this.shape = shape;
    this.number = number;
    this.shading = shading;
}

//create a deck for 81 cards
function generateDeck() {
    const deck = [];
    let id = 0;
    for (let colorIndex = 0; colorIndex < colorArr.length; colorIndex++) {
        for (let shapeIndex = 0; shapeIndex < shapeArr.length; shapeIndex++) {
            for (let numberIndex = 0; numberIndex < numberArr.length; numberIndex++) {
                for (let shadingIndex = 0; shadingIndex < shadingArr.length; shadingIndex++) {
                    const card = {
                        id,
                        color: colorArr[colorIndex],
                        shape: shapeArr[shapeIndex],
                        number: numberArr[numberIndex],
                        shading: shadingArr[shadingIndex],
                    };
                    deck.push(card);
                    id++;
                }
            }
        }
    }

    return deck;
}


//shuffle the card
function shuffle(deck) {
    state.shuffledDeck = [...deck];
    //Fisher-Yates (Knuth) Shuffle
    for (let i = state.shuffledDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [state.shuffledDeck[i], state.shuffledDeck[randomIndex]] = [state.shuffledDeck[randomIndex], state.shuffledDeck[i]];
    };
    return state.shuffledDeck;
}


//generate 12 cards on table
function onTable() {

    let set = [];
    let setFlag = false;

    //The 12 cards should always contain at least 1 set
    while (!setFlag) {
        state.cardsOnTable = [];
        //draw 12 cards
        for (let i = 0; i < 12; i++) {
            let removedCard = state.shuffledDeck.shift();
            state.cardsOnTable.push(removedCard);
        };
        //check if there is at least 1 set
        set = findSet(state.cardsOnTable);
        if (set.length != 0) {
            setFlag = true;
        } else {
            //If not, redraw 12 cards
            while (state.cardsOnTable.length > 0) {
                state.shuffledDeck.push(state.cardsOnTable.pop());
            }
        }
        console.log(set);
    }
    console.log(state.cardsOnTable);
    return state.cardsOnTable;
}



//display the cards from cardsOnTable list
export function displayCards() {
    const container = document.querySelector(".card-display-container");
    //Clear old content
    //BE CAREFUL this will also clear old elements
    //which means old listener will be cleared!!!!!!!!!!!!!
    container.innerHTML = '';
    //create the div for cards
    for (const card of state.cardsOnTable) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-box')
        //set the div id as the card id
        cardDiv.id = card.id;

        //set the img under the card div
        const img = document.createElement('img');
        img.src = `picture/${card.color}-${card.shape}-${card.number}-${card.shading}.jpg`;
        img.alt = `Card ${card.id} : ${card.color}-${card.shape}-${card.number}-${card.shading}`;
        img.classList.add('card');

        //append the div under container
        cardDiv.appendChild(img);
        container.appendChild(cardDiv);
    };
};

function showDiv() {
    var divElement = document.getElementById("summaryPanel");
    var divElement2 = document.getElementById("grey");
    // Set visible
    divElement.style.display = "block";
    divElement2.style.display = "block";
}
function hideDiv() {
    var divElement = document.getElementById("summaryPanel");
    var divElement2 = document.getElementById("grey");
    // hide the div
    divElement.style.display = "none";
    divElement2.style.display = "none";
}

function writeText(div,text) {
    var divElement = document.getElementById(div);
    divElement.textContent = text;
}

window.onload = function () {
    //Initialize cards (deck shuffledDeck cardsOnTable) and  time
    const deck = generateDeck();
    state.shuffledDeck = shuffle(deck);
    state.cardsOnTable = onTable();
    state.totalSeconds = 1 * 30;

    //Add listener to Start Game
    let startBtn = document.getElementById("StartGame");
    startBtn.addEventListener("click", function () {
        state.gameIsActive = true;
        if (state.gameIsActive == true) {
            //If start game is clicked, game begin
            startGameLoop();
            //If end rules meet           
            if((state.shuffledDeck.length==0 && state.cardsOnTable.length==0)|| state.totalSeconds==0){
                //inactive the game
                state.gameIsActive = false;
                //visible game summary and grey
                showDiv();
                //write the result
                writeText("SetsFound",state.scoreNum);
                writeText("TimeUsed",state.totalSeconds);
            
                let newGame2Btn = document.getElementById("NewGame2");
                    newGame2Btn.addEventListener("click", function () {
                        //invisible the game summary and grey
                        hideDiv();
                        location.reload(); //  "New Game" will refreash the whole page
                    });
            }
        }
    });

    //add listener to New Game button
    let newGameBtn = document.getElementById("NewGame");
        newGameBtn.addEventListener("click", function () {
        location.reload(); //  "New Game" will refreash the whole page
    });

    //printCardsInfo(cardsOnTable);
    displayCards();

    //Set up message and scoreboard
    state.text = "Try your best to find sets!";
    message(state.text);
    displayScore(state.scoreNum);
};

function startGameLoop() {

    hideDiv();

    displayCards();
    setupClickListeners();

    //cheating
    console.log(findSet(state.cardsOnTable));
    console.log(state.cardsOnTable);
}

export function cardClickListener(card,cards){
    //link the card with id
    let cardId = card.getAttribute('id');

    // Check if the card is already selected
    let isSelected = card.classList.contains('selected');

    message("Click a card to continue");
    if (isSelected) {
        // Card is already selected, unselect it
        card.classList.remove('selected');
        // Remove selected card from array
        state.userSelected = state.userSelected.filter((selectedCard) => selectedCard.id != cardId);
    } else {
        // Card is not selected, select it and add it to the userSelected array
        card.classList.add('selected');
        const clickedCard = state.cardsOnTable.find(function (card) {
            return card.id === parseInt(cardId);
        });
        state.userSelected.push(clickedCard);
    }

    //if user selected 3
    if (state.userSelected.length === 3) {
        //check if it is a set
        let isSet = verifySet(state.userSelected[0], state.userSelected[1], state.userSelected[2]);
        state.text = isSet ? 'Yes, it is a set!' : 'No, it is not a set!';
        message(state.text);

        //if it is not, promoted to restart the game
        if (!isSet) {
            displayScore(state.scoreNum); 
            // Clear seleced cards
            state.userSelected = [];
        } else {
            state.scoreNum += 1;
            displayScore(state.scoreNum);
            if (state.shuffledDeck.length === 0) {
                //Need to be done
                console.log("There is no card in shuffledDeck");
            } else {
                //Avoid muti-listeners
                cards.forEach(function (card) {
                    card.removeEventListener;
                });

                //Replace cards
                cardReplacing(state.userSelected[0], state.userSelected[1], state.userSelected[2], state.cardsOnTable, state.shuffledDeck);
                //Clear seleced cards
                state.userSelected = [];
                startGameLoop();
            }
        }

        //clear the selection
        cards.forEach(function (card) {
            card.classList.remove('selected');
        });
    };
}

export function setupClickListeners() {
    const cards = document.querySelectorAll('.card-box');
    state.userSelected = [];

    //Add listener to every card using cardClickListener
    //I seperate adding listeners to 2 steps because I need to solve another problem
    //However, it turns out to be meaningless. I may combine them back
    cards.forEach(function (card) {
        card.addEventListener('click', function(){
            cardClickListener(card,cards);
        });
    });
};

//Export state
export const userState = state;



/*Current problems

2. Game will end after 3 cards is selected. It should continue before time = 0

*/


import { findSet, cardReplacing } from './cardReplacing.js';
import { verifySet } from './verifySet.js';
import { message } from './message.js';
import { displayScore } from './ScoreBoard.js';

let gameIsActive = false;
let userSelected = [];
let scoreNum = 0;
let oldScore = scoreNum;
let text = "test";



//initialize the card attributes array
const colorArr = ["blue", "green", "purple"];
const shapeArr = ["diamond", "oval", "squiggles"];
const numberArr = [1, 2, 3];
const shadingArr = ["open", "solid", "striped"];



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

//test
const deck = generateDeck();
console.log(deck);

//shuffle the card
function shuffle(deck) {
    let shuffledDeck = [...deck];
    //Fisher-Yates (Knuth) Shuffle
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
    };
    return shuffledDeck;
}


//generate 12 cards on table
function onTable(shuffledDeck) {
    let cardsOnTable = [];
    let hasSet = false;
    let hint = [];
    while (!hasSet) {
        cardsOnTable = [];
        for (let i = 0; i < 12; i++) {
            let removedCard = shuffledDeck.shift();
            cardsOnTable.push(removedCard);
        };
        hasSet = findSet(cardsOnTable);
        if (!hasSet) {
            while (cardsOnTable.length > 0) {
                shuffledDeck.push(cardsOnTable.pop());
            }
        } else {
            //Can be used for print hint 
            console.log(hasSet);
        }
    }
    console.log(cardsOnTable);
    return cardsOnTable;
}



//display the cards from cardsOnTable list
function displayCards(cardsOnTable) {
    const container = document.querySelector(".card-display-container");
    //Clear old content
    container.innerHTML = '';
    //create the div for cards
    for (const card of cardsOnTable) {
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



window.onload = function () {
    const deck = generateDeck();
    const shuffledDeck = shuffle(deck);
    let cardsOnTable = onTable(shuffledDeck);
    let startBtn = document.getElementById("StartGame");

    startBtn.addEventListener("click", function() {
        gameIsActive = true;
        if(gameIsActive == true){
            setupClickListeners(cardsOnTable, shuffledDeck, scoreNum);
        }     
    });


    //printCardsInfo(cardsOnTable);
    displayCards(cardsOnTable);
    
    //Set up message and scoreboard
    let text = "try your best to find sets!";
    message(text);
    displayScore(scoreNum);
};

// function updatePage(scoreNum,cardsOnTable){
//     displayScore(scoreNum);
//     if(oldScore<scoreNum){
//         cardClickHandler(cardsOnTable)
//         oldScore=scoreNum;
//     }
// }

function setupClickListeners(cardsOnTable, shuffledDeck, scoreNum) {
    const cards = document.querySelectorAll('.card-box');
    let userSelected = [];
    let temp;
    cards.forEach(function (card) {
        card.addEventListener('click', function () {

            //link the card with id
            let cardId = card.getAttribute('id');

            // Check if the card is already selected
            let isSelected = card.classList.contains('selected');

            if (isSelected) {
                // Card is already selected, unselect it
                card.classList.remove('selected');
                // Remove selected card from array
                userSelected = userSelected.filter((selectedCard) => selectedCard.id != cardId);

                //console.log(userSelected);

            } else {
                // Card is not selected, select it and add it to the userSelected array
                card.classList.add('selected');
                const clickedCard = cardsOnTable.find(function (card) {
                    return card.id === parseInt(cardId);
                });
                userSelected.push(clickedCard);

                //console.log(userSelected);
            }


            //if user selected 3
            if (userSelected.length === 3) {
                //check if it is a set
                let isSet = verifySet(userSelected[0], userSelected[1], userSelected[2]);
                text = isSet ? 'Yes, it is a set!' : 'No, it is not a set!';
                message(text);

                //if it is not, promoted to restart the game
                if (!isSet) {
                    displayScore(scoreNum);   //These displayScore function cannot work.
                    userSelected = [];
                } else {
                    scoreNum += 1;
                    console.log(scoreNum);
                    displayScore(scoreNum);
                    if (shuffledDeck.length === 0) {
                        console.log("There is no card in shuffledDeck");
                    } else {
                        cards.forEach(function (card) {
                            card.removeEventListener;
                        });
                        //Replace cards
                        cardReplacing(userSelected[0], userSelected[1], userSelected[2], cardsOnTable, shuffledDeck);
                        cardId = card.getAttribute('id');
                        displayCards(cardsOnTable);


                        setupClickListeners(cardsOnTable, shuffledDeck, scoreNum);

                        //cheating
                        console.log(findSet(cardsOnTable));
                        console.log(cardsOnTable);
                    }
                }

                //clear the selection
                cards.forEach(function (card) {
                    card.classList.remove('selected');
                });

                //console.log(userSelected);
            };
            console.log(userSelected);
        });
    });
};



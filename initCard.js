
/*Current Problem
1. Faied to call displayScore. Alaways return error message cannot find "scoreNum". May caused by iframe in html/Or the order to load DOM.
2.
*/

import { findSet, cardReplacing } from './cardReplacing.js';
import { verifySet } from './verifySet.js';

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
    const shuffledDeck = [...deck];
    //Fisher-Yates (Knuth) Shuffle
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
    };
    return shuffledDeck;
}

//test
const shuffledDeck = shuffle(deck);
//console.log(shuffledDeck);

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
    return cardsOnTable;
}

//let cardsOnTable = onTable(shuffledDeck);

//Even: test
function printCardsInfo(cardsOnTable) {
    for (let i = 0; i < cardsOnTable.length; i++) {
        const card = cardsOnTable[i];
        console.log(`Card ${i + 1}:`);
        console.log(`Id ${card.id}:`);
        console.log(`Color: ${card.color}`);
        console.log(`Shape: ${card.shape}`);
        console.log(`Number: ${card.number}`);
        console.log(`Shading: ${card.shading}`);
        console.log('-----------------------------');
    }
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

    //for test
    console.log(cardsOnTable)
};



window.onload = function () {
    const deck = generateDeck();
    const shuffledDeck = shuffle(deck);
    let cardsOnTable = onTable(shuffledDeck);
    //rintCardsInfo(cardsOnTable);
    displayCards(cardsOnTable);

    setupClickListeners(cardsOnTable);
};


//add the clickListener for the cards to connect verifySet function with the html

function setupClickListeners(cardsOnTable) {
    const cards = document.querySelectorAll('.card-box');
    let resultText = document.getElementById('resultText');
    let userSelected = [];

    cards.forEach(function (card) {
        card.addEventListener('click', function () {
            //add the score board
            // Initialize the score to 0
            let scoreNum = 0;

            //link the card with id
            const cardId = card.getAttribute('id');

            // Check if the card is already selected
            const isSelected = card.classList.contains('selected');

            if (isSelected) {
                // Card is already selected, unselect it
                card.classList.remove('selected');
                // Remove the card from the userSelected array
                userSelected = userSelected.filter((selectedCard) => selectedCard.id !== cardId);
                console.log(userSelected);
            } else {
                // Card is not selected, select it and add it to the userSelected array
                card.classList.add('selected');
                const clickedCard = cardsOnTable.find(function (card) {
                    return card.id === parseInt(cardId);
                });
                userSelected.push(clickedCard);
                console.log(userSelected);
            }

            //if user selected 3
            if (userSelected.length === 3) {
                //check if it is a set
                const isSet = verifySet(userSelected[0], userSelected[1], userSelected[2]);
                resultText.textContent = isSet ? 'Yes, it is a set!' : 'No, it is not a set!';
                //scoreNum=2;

                //if it is not, promoted to restart the game
                if (!isSet) {
                    resultText.textContent += ' Click a card to restart the game.';
                    //displayScore(10);   //These displayScore function cannot work.
                } else {
                    scoreNum += 1;
                    //displayScore(scoreNum);
                    if (shuffledDeck.length === 0) {
                        console.log("There is no card in shuffledDeck");
                    } else {
                        //Replace cards
                        cardReplacing(userSelected[0], userSelected[1], userSelected[2], cardsOnTable, shuffledDeck);
                        //Refreash card displayed
                        displayCards(cardsOnTable);
                    }
                }

                //clear the selection
                cards.forEach(function (card) {
                    card.classList.remove('selected');
                });
                userSelected.length = 0;
                console.log(userSelected);
            };
        });
    });
};



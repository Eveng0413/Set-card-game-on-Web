//initialize the card attributes array
const colorArr = ["blue", "green","purple"];
const shapeArr=["diamond", "oval", "squiggles"];
const numberArr=[1,2,3];
const shadingArr=["open","solid","striped"];


//construct the card into object
function Card(id, color, shape, number,shading){
    this.id=id;
    this.color=color;
    this.shape=shape;
    this.number=number;
    this.shading =shading;
}

//create a deck for 81 cards
function generateDeck(){
    const deck=[];
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
const deck=generateDeck();
console.log(deck);

//shuffle the card
function shuffle(deck){
    const shuffledDeck=[...deck];
    //Fisher-Yates (Knuth) Shuffle
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
    };
    return shuffledDeck;
}

//test
const shuffledDeck = shuffle(deck);
console.log(shuffledDeck);

//generate 12 cards on table
function onTable(shuffledDeck){
    const cardsOnTable=[];
    for(let i=0; i<12; i++){
        let removedCard=shuffledDeck.shift();
        cardsOnTable.push(removedCard);
    };
    return cardsOnTable;
}

//test
//const cardsOnTable = onTable(shuffledDeck);
//console.log(cardsOnTable);

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
    //create the div for cards
    for(const card of cardsOnTable){
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card-box')
        //set the div id as the card id
        cardDiv.id=card.id;
        
        //set the img under the card div
        const img = document.createElement('img');
        img.src = `picture/${card.color}-${card.shape}-${card.number}-${card.shading}.jpg`;
        img.alt = `Card ${card.id} : ${card.color}-${card.shape}-${card.number}-${card.shading}`;
        img.classList.add('card');

        //append the div under container
        cardDiv.appendChild(img);
        container.appendChild(cardDiv);
    };

    //const cardSlots = document.querySelectorAll('.card-box');

    // cardsOnTable.forEach((card, index) => {
    //     const img = document.createElement('img');

    //     img.src = `picture/${card.color}-${card.shape}-${card.number}-${card.shading}.jpg`;
    //     img.alt = `Card ${index + 1} : ${card.color}-${card.shape}-${card.number}-${card.shading}`;
    //     img.classList.add('card');

    //     cardSlots[index].appendChild(img);
    // });
};

window.onload = function() {
  const deck = generateDeck();
  const shuffledDeck = shuffle(deck);
  let cardsOnTable = onTable(shuffledDeck);
  printCardsInfo(cardsOnTable);
  displayCards(cardsOnTable);
};

/**
 * Takes 3 cards and returns whether they are a set or not,
 * according to the rules of the game Set.
 * 
 * @param card1 
 * @param card2 
 * @param card3 
 * @returns boolean isSet
 */
function verifySet(card1, card2, card3) {

    let isSet = true;

    //Tests for color
    if (card1.color == card2.color) { //If 1 and 2 have the same color
        if (card2.color != card3.color) { //2 must have the same color as 3
            isSet = false;
        }
    } else { //If 1 and 2 have different colors
        //3's color must be different from 1's and 2's
        if ((card1.color == card3.color) || (card2.color == card3.color)) { 
            isSet = false;
        }
    }

    //Tests for shape
    if (card1.shape == card2.shape) { //If 1 and 2 have the same shape
        if (card2.shape != card3.shape) { //2 must have the same shape as 3
            isSet = false;
        }
    } else { //If 1 and 2 have different shapes
        //3's shape must be different from 1's and 2's
        if ((card1.shape == card3.shape) || (card2.shape == card3.shape)) { 
            isSet = false;
        }
    }

    //Tests for number
    if (card1.number == card2.number) { //If 1 and 2 have the same number
        if (card2.number != card3.number) { //2 must have the same number as 3
            isSet = false;
        }
    } else { //If 1 and 2 have different numbers
        //3's number must be different from 1's and 2's
        if ((card1.number == card3.number) || (card2.number == card3.number)) { 
            isSet = false;
        }
    }

    //Tests for shading
    if (card1.shading == card2.shading) { //If 1 and 2 have the same shading
        if (card2.shading != card3.shading) { //2 must have the same shading as 3
            isSet = false;
        }
    } else { //If 1 and 2 have different shadings
        //3's shading must be different from 1's and 2's
        if ((card1.shading == card3.shading) || (card2.shading == card3.shading)) { 
            isSet = false;
        }
    }

    return (isSet);
}

//WAITING FIX:
//Even: add the clickListener for the cards to connect verifySet function with the html
const cards = document.querySelectorAll('.card-box');
let resultText=document.getElementById('resultText');
let userSelected=[];

cards.forEach(function(card){
    card.addEventListener('click',function(){
        //toggle between selected and not selected
        card.classList.toggle('selected');
        const cardId = card.getAttribute('id');

        //check if userSelected contained the newly clicked obj
        const index = userSelected.findIndex(function(obj) {
            return obj.id === cardId;
        });

        if(index<0){
            userSelected.push(card);
            console.log(userSelected);
        }else{
            userSelected.splice(index, 1);
            console.log(userSelected);
        }

        //if user selected 3
        if(userSelected.length === 3){
            //FIXME: verifySet takes objects
            console.log(userSelected);
            const isSet = verifySet(userSelected[0],userSelected[1],userSelected[2]);
            resultText.textContent = isSet ? 'Yes' : 'No';
            clearSelection();
            console.log(userSelected);
        }
    });   
});

//clear selection
function clearSelection() {
    cards.forEach(function(card) {
        card.classList.remove('selected');
    });
    userSelected = [];
};


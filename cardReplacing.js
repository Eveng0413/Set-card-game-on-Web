//initialize the card attributes array
const colorArr = ["red", "green","purple"];
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
const deck = generateDeck();

//shuffle the card
function shuffle(deck){
    const shuffledDeck=[...deck];
    //Fisher-Yates (Knuth) Shuffle
    for (let i = shuffledDeck.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        [shuffledDeck[i], shuffledDeck[randomIndex]] = [shuffledDeck[randomIndex], shuffledDeck[i]];
    }
    return shuffledDeck;
}

//test
const shuffledDeck = shuffle(deck);

//generate 12 cards on table
function onTable(shuffledDeck){
    const cardsOnTable=[];
    for(let i=0; i<12; i++){
        let removedCard=shuffledDeck.shift();
        cardsOnTable.push(removedCard);
    }
    return cardsOnTable;
}

//test
const cardsOnTable = onTable(shuffledDeck);

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

// Find set(s) in a given array of cards
function findSet(arrOfCards) {
    const results = [];
    
    function backtrack(combination, start) {
        if (combination.length === 3) {
            let card1 = combination[0];
            let card2 = combination[1];
            let card3 = combination[2];
            if (verifySet(card1, card2, card3)) {
                let IDs = [card1.id, card2.id, card3.id]
                results.push(IDs);
            }
            return;
        }
        
        for (let i = start; i < arrOfCards.length; i++) {
            combination.push(arrOfCards[i]);
            backtrack(combination, i + 1);
            combination.pop();
        }
    }
    
    backtrack([], 0);
    return results;
}


// Push 3 new cards after find a set, Note: ensure at least one set on the deck
function cardReplacing(card1, card2, card3, cardsOnTable, shuffledDeck){

    // store the info
    let checker = 0;
    let indexOf_card1 = cardsOnTable.indexOf(card1);
    let indexOf_card2 = cardsOnTable.indexOf(card2);
    let indexOf_card3 = cardsOnTable.indexOf(card3);

    // loop untill there is a set after replacing three new cards into the table
    while (checker == 0) {
        // three new cards from shuffled deck
        let new_card1 = shuffledDeck.pop();
        let new_card2 = shuffledDeck.pop();
        let new_card3 = shuffledDeck.pop();

        // replacing them with old three cards
        cardsOnTable[indexOf_card1] = new_card1;
        cardsOnTable[indexOf_card2] = new_card2;
        cardsOnTable[indexOf_card3] = new_card3;

        console.log("3 new cards: ", new_card1, new_card2, new_card3);

        // if find a set, good. if not, push cards back to end of the shuffled deck 
        if (findSet(cardsOnTable).length != 0){
            checker = 1;
        } else {
            shuffledDeck.push(new_card1, new_card2, new_card3);
        }
    }
}

// find card by id
function findByID(id, cards){
    let result = -1;
    for (let i = 0; i < cards.length; i++){
        if (cards[i].id == id){
            result = i;
        }
    }
    return result;
}


/*
* TEST CASES
*/
console.log("Cards on the table: \n",cardsOnTable);
console.log("\nRemaining cards in the pool: ", shuffledDeck.length);

console.log("\n-----------------------------------------------\n");

const setsID = findSet(cardsOnTable);
console.log("ID of sets in above cards: ",setsID);

console.log("\n-----------------------------------------------\n");

let ind1 = findByID(setsID[0][0], cardsOnTable);
let ind2 = findByID(setsID[0][1], cardsOnTable);
let ind3 = findByID(setsID[0][2], cardsOnTable);
console.log("Indexes of first set on the table: ", ind1, ind2, ind3)
let card1 = cardsOnTable[ind1];
let card2 = cardsOnTable[ind2];
let card3 = cardsOnTable[ind3];
console.log("First set: \n",card1);
console.log("\n",card2);
console.log("\n",card3);

console.log("\n-----------------------------------------------\n");

cardReplacing(card1, card2, card3, cardsOnTable, shuffledDeck);

console.log("\n-----------------------------------------------\n");

console.log("Cards on the table after replacing: \n",cardsOnTable);
console.log("\nRemaining cards in the pool: ", shuffledDeck.length)


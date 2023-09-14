/*
In the data structure of each card, we use number reprensentation of each feature:
    card[0] is the color feature (0 is "red", 1 is "green", 2 is "purple")
    card[1] is the shape feature (0 is "diamond", 1 is "oval", 2 is "squiggles") 
    card[3] is the shading feature (0 is "open", 1 is "solid", 2 is "striped")
    card[2] is the number of shapes (0 is "1 shape", 1 is "2 shapes", 2 is "3 shapes")
example:
    card1 = [0,0,1,2]
    card1[0] is 0 which means the card is red.
    card1[1] is 0 which means the card is diamond in shape.
    card1[3] is 1 which means the card is solid within the shape.
    card1[2] is 2 which means the card is 3 shapes.
*/

// Jamie's function which verify the set
function verifySetWithArray(card1, card2, card3) {

    let isSet = true;

    for (let i = 0; i < 4; i++) {
        if ((card1[i] + card2[i] + card3[i]) % 3 != 0) {
            isSet = false;
        }
    }

    return isSet;
}

// Find set(s) in a given array of cards
function findSet(arr) {
    const results = [];
    
    function backtrack(combination, start) {
        if (combination.length === 3) {
            if (verifySetWithArray(combination[0], combination[1], combination[2])) {
                indexes = [arr.indexOf(combination[0]), arr.indexOf(combination[1]), arr.indexOf(combination[2])]
                results.push(indexes);
            }
            return;
        }
        
        for (let i = start; i < arr.length; i++) {
            combination.push(arr[i]);
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
    while (checker != 1) {
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

// Generate radom features for a card
function generateRandomArray(length) {
    const array = [];
    for (let i = 0; i < length; i++) {
        array.push(Math.floor(Math.random() * 3)); // Generates a random integer between 0 and 2
    }
    return array;
  }

// Generate number of unique cards stored in a array
function generateUniqueArrays(count, length) {
    const uniqueArrays = new Set();
  
    while (uniqueArrays.size < count) {
        const randomArray = generateRandomArray(length);
        uniqueArrays.add(JSON.stringify(randomArray)); // Using JSON.stringify to ensure uniqueness
    }
  
    return Array.from(uniqueArrays).map((strArray) => JSON.parse(strArray));
  }




/*
* TEST CASES
*/

const numberOfCards = 81;
const numberOfFeatures = 4;
  
const shuffledDeck = generateUniqueArrays(numberOfCards, numberOfFeatures);

const cardsOnTable = [];
for (let i = 0; i < 12; i++){
    let card = shuffledDeck.pop();
    cardsOnTable.push(card);
}

console.log("Cards on the table: \n",cardsOnTable);
console.log("\nRemaining cards in the pool: ", shuffledDeck.length);
console.log("\n-----------------------------------------------\n");

const combinations = findSet(cardsOnTable);
console.log("Indexes of sets in above cards: ",combinations);
console.log("\n-----------------------------------------------\n");

ind1 = combinations[0][0];
ind2 = combinations[0][1];
ind3 = combinations[0][2];
card1 = cardsOnTable[ind1];
card2 = cardsOnTable[ind2];
card3 = cardsOnTable[ind3];
console.log("First set: \n",card1);
console.log(card2);
console.log(card3);
cardReplacing(card1, card2, card3, cardsOnTable, shuffledDeck);
console.log("\n-----------------------------------------------\n");

console.log("Cards on the table after replacing: \n",cardsOnTable);
console.log("\nRemaining cards in the pool: ", shuffledDeck.length)


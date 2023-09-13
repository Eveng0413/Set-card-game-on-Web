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
// const deck=generateDeck();
// console.log(deck);

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
// const shuffledDeck = shuffle(deck);
// console.log(shuffledDeck);

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
// const cardsOnTable = onTable(shuffledDeck);
// console.log(cardsOnTable);


// Push 3 new cards after find a set, Note: ensure at least one set on the deck
function cardReplacing(card1, card2, card3, cardsOnTable, shuffledDeck){

    // find three new cards, Note: ensure at least one set on the deck
    let temp = cardsOnTable;
    let checker = False;

    while (checker) {
        let new_card1 = shuffledDeck.pop();
        let new_card2 = shuffledDeck.pop();
        let new_card3 = shuffledDeck.pop();

        cardsOnTable.splice(temp.indexOf(card1),1,new_card1)
        cardsOnTable.splice(temp.indexOf(card2),1,new_card2)
        cardsOnTable.splice(temp.indexOf(card3),1,new_card3)
        if (findSet(temp)){
            checker = True;
        } else {
            shuffledDeck.push(new_card1, new_card2, new_card3);
        }
    }
    

    if isSet(card1, card2, card3){
        cardsOnTable.splice(1,1,)
    }
}

let card1 = new Card(3,"red","round",1,"stripe");
console.log(card1);
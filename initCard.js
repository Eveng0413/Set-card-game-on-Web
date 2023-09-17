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
    }
    return shuffledDeck;
}

//test
const shuffledDeck = shuffle(deck);
console.log(shuffledDeck);

function displayCards(deck) {
    const cardSlots = document.querySelectorAll('.card-box');

    deck.forEach((card, index) => {
        const img = document.createElement('img');

        img.src = `picture/${card.color}-${card.shape}-${card.number}-${card.shading}.jpg`;
        img.alt = `Card ${index + 1}`;
        img.classList.add('card');

        cardSlots[index].appendChild(img);
    });
}

window.onload = function() {
  const deck = generateDeck();
  const shuffledDeck = shuffle(deck);
  displayCards(shuffledDeck);
};



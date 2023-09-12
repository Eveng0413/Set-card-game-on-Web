//initialize the card attributes array
const colorArr = ["red", "green","purple"];
const shapeArr=["diamond", "oval", "squiggles"];
const numberArr=[1,2,3];
const shadingArr=["open","solid","striped"]


//construct the card into object
function Card(id, color, shape, number,shading){
    this.id = id;
    this.color=color;
    this.shape=shape;
    this.number=number;
    this.shading =shading;
}

//generate random attributes for a card
function Generator(attributesArray){
    let randomIndex = Math.floor(Math.random() * attributesArray.length);
    let attribute = attributesArray[randomIndex];
    return attribute;
}

//test
//const card1 = new Card(1,Generator(colorArr),Generator(shapeArr),Generator(numberArr),Generator(shadingArr));
//console.log(card1);
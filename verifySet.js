
/**
 * Takes 3 cards and returns whether they are a set or not,
 * according to the rules of the game Set.
 * 
 * @param card1 
 *      array of 4 integers
 * @param card2 
 *      array of 4 integers
 * @param card3 
 *      array of 4 integers
 * @returns boolean isSet
 */
function verifySet(card1, card2, card3) {

    let isSet = true;

    for (let i = 0; i < 4; i++) {
        if ((card1[i] + card2[i] + card3[i]) % 3 != 0) {
            isSet = false;
        }
    }

    return isSet;
}
 
/*
* TEST CASES
*/
// let card1 = [1,0,0,0];
// let card2 = [1,1,0,0];
// let card3 = [1,2,0,0];

// console.log("Expectation: true")
// console.log(verifySet(card1,card2,card3));

// let card4 = [1,0,1,0];
// let card5 = [1,1,0,0];
// let card6 = [1,2,0,0];

// console.log("Expectation: false")
// console.log(verifySet(card4,card5,card6));

/** 
 * Finds every set within an array of 12 cards
 * 
 * @param cardArr 
 *      array of 12 cards that are in play,
 *      each card is an array of 4 integers
 * @returns smallArrOfSets
 *      array of all of the sets in those 12 cards,
 *      each element is an array of 3 indexes, one for each card
 * @calls verifySet 
 */
function findAllSets(cardArr) {

    //Start with big array which will later betrimmed down into
    //  just the right amount of sets in the group of cards 
    let bigArrOfSets = new Array(20);
    let bigArrOfSetsIdx = 0;

    //Triple nested for loop that iterates through every unique triplet of cards
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                if (verifySet(cardArr[i],cardArr[j],cardArr[k])) { //If the 3 cards are a set
                    let indexesOfSet = [i, j, k];  //Then save indexes of the cards
                    bigArrOfSets[bigArrOfSetsIdx] = indexesOfSet;  //And add them to the big array of sets
                    bigArrOfSetsIdx++;
                }
            }
            

        }
    }

    //Now move the array to one of the right size
    let smallArrOfSets = new Array(bigArrOfSetsIdx);
    for (let i = 0; i < bigArrOfSetsIdx; i++) {
        smallArrOfSets[i] = bigArrOfSets[i];
    }

    return smallArrOfSets;
}

/** 
 * Finds 1 set within an array of 12 cards,
 * if a set is not found, returns [-1,-1,-1]
 * 
 * @param cardArr 
 *      array of 12 cards that are in play,
 *      each card is an array of 4 integers
 * 
 * @returns array of 3 indexes, one for each card in the set
 * 
 * @calls verifySet 
 */
function findASet(cardArr) {

    //Triple nested for loop that iterates through every unique triplet of cards
    for (let i = 0; i < 12; i++) {
        for (let j = i + 1; j < 12; j++) {
            for (let k = j + 1; k < 12; k++) {
                if (verifySet(cardArr[i],cardArr[j],cardArr[k])) { //If the 3 cards are a set
                    return [i,j,k];    //then return their indexes
                }
            }
        }
    }

    //Will only happen if loop never finds a set
    return [-1,-1,-1]
}

//TEST CASES
let cardArr = [
    [0,0,0,1],[0,2,0,0],[0,0,1,2],[2,0,2,0],
    [2,0,1,2],[1,1,2,0],[1,0,2,0],[0,1,2,1],
    [2,1,0,0],[2,0,1,0],[1,0,1,2],[0,2,1,1]
]

//Testing findASet
let foundSet = findASet(cardArr);
//console.log(foundSet);
console.log(foundSet[0]);
console.log(cardArr[foundSet[0]]);
console.log(foundSet[1]);
console.log(cardArr[foundSet[1]]);
console.log(foundSet[2]);
console.log(cardArr[foundSet[2]]);

console.log(verifySet(cardArr[foundSet[0]], cardArr[foundSet[1]], cardArr[foundSet[2]])); //Must return true

//Testing findAllSets
let arrOfSets = findAllSets(cardArr);
console.log(arrOfSets);
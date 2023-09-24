import {verifySet} from './verifySet.js';

/** 
 * Finds every set within an array of 12 cards
 * 
 * @param(cardsOnTable 
 *      array of 12 cards that are in play,
 *      each card is an array of 4 integers
 * @returns smallArrOfSets
 *      array of all of the sets in those 12 cards,
 *      each element is an array of 3 indexes, one for each card
 * @calls verifySet 
 */
export function findAllSets(cardArr) {

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
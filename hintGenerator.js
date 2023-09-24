import { userState } from './initCard.js';
import { message } from './message.js';
import {findAllSets} from './findSets.js';

let numOfHints = 0;

let hint = document.getElementById("hint"); //Accesses hint button on main page

hint.addEventListener('click', function() { //When hint button is pressed, generate hint and increment numOfHints

    if (userState.gameIsActive) {
        generateHint(userState.cardsOnTable, numOfHints);
        numOfHints++;
    }

})

//Accessed in cardReplacing.js - when cards are replaced, reset numOfHints
export function resetHints() {
    numOfHints = 0;
}

/**
 * Generates hints and outputs them to the message box on the main page.
 * There are 3 hints available, the first says how many valid sets there are,
 * the second highlights one card and says how many sets it is in,
 * and the third highlights two cards that are in a valid set.
 * 
 * @param cardArr  
 *      the array of cards that are visible to the user
 * @param numOfHints
 *      the number of hints already given to the user
 * @calls findAllSets
 * @calls message
 */
function generateHint(cardArr, numOfHints) {

    let cardButtons= document.querySelectorAll('.card-box');

    let sets = findAllSets(cardArr);

    //First hint, display num of valid sets
    if (numOfHints == 0) { 

        let numOfSets = sets.length;

        //If-else required for correct grammar
        if (numOfSets == 1) {
            message("HINT 1: There is 1 set currently in play");
        } else {
            message("HINT 1: There are " + numOfSets + " sets currently in play");
        }

    //Second and third hint, highlight cards
    } else if (numOfHints >= 1) {
        
        /*
        * Use map to find the most common card in the available sets
        */
       
        //Fill map with card indexes and the amount of times they are seen in valid sets
        let idxMap = new Map();
        for (let i = 0; i < sets.length; i++) { //Iterate through the array of arrays that are valid sets
            for (let j = 0; j < 3; j++) { 
                //If map has key, increment value, if not, add it with value of 1
                if (idxMap.has(sets[i][j])) { 
                    let num = idxMap.get(sets[i][j])
                    idxMap.set(sets[i][j], num + 1);
                } else {
                    idxMap.set(sets[i][j], 1);
                }
            }
        }

        //Find the idx of card in the most sets
        let maxKey = sets[0][0];
        for(let key of idxMap.keys()) {
            if (idxMap.get(key) > idxMap.get(maxKey)) {
                maxKey = key;
            }
        }

        let numOfSetsKeyIsIn = idxMap.get(maxKey);

        //If-else for correct grammar
        if (numOfSetsKeyIsIn == 1) {
            message("HINT 2: The highlighted card is within " + numOfSetsKeyIsIn + " set.");
        } else {
            message("HINT 2: The highlighted card is within " + numOfSetsKeyIsIn + " sets.");
        }
        
        
        cardButtons[maxKey].classList.add('hinted'); //Added css hinted attribute to the card in most sets

        //Third hint, highlight 2 cards
        if (numOfHints >= 2) { 
            
            //Find the set that includes the card in the most sets
            let setWithMaxKey = new Array(3);
            for (let i = 0; i < sets.length; i++) {
                if (sets[i].includes(maxKey)) {
                    setWithMaxKey = sets[i];
                }
            }

            //Find another card in the set that has the card in the most sets
            let secondHintCardIdx = 0;
            for (let i = 3; i > 0; i--) {
                if (setWithMaxKey[i] != maxKey) {
                    secondHintCardIdx = setWithMaxKey[i];
                }
            }

            message("HINT 3: The two highlighted cards are in a valid set.");

            cardButtons[secondHintCardIdx].classList.add('hinted'); //Added css hinted attribute to the other card

        }

    }

}




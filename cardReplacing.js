import {verifySet} from './verifySet.js';
import {resetHints} from './hintGenerator.js';

/**
 * Find set(s) in a given array of cards
 * 
 * @param arrOfCards 
 *          Array of cards which may or may not contain set(s)
 * @returns int results[][]
 *          Arrays of IDs for each set 
 *          (ie. Assume card1, card2, and card3 with IDs 72, 40, and 8
 *          in array of cards are a set. The result = [[72,40,8]])
 */
export function findSet(arrOfCards) {
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

/**
 * Push 3 new cards after finding a set 
 * 
 * @param card1 
 * @param card2 
 * @param card3 
 *          Three cards that makes a set 
 * @param cardsOnTable
 *          All 12 cards on the table
 * @param shuffledDeck 
 *          The rest of all cards in the deck pool
 * @pre_condition 
 *          The three cards must be a set AND {shuffledDeck} is not empty
 * @post_condition
 *          3 new cards replaced on the table AND there is at least one set on the table
 */
export function cardReplacing(card1, card2, card3, cardsOnTable, shuffledDeck){

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

    resetHints(); //Inside hintGenerator.js, resets the amount of hints
}
/**
 * Find card by id
 * 
 * @param id
 *          Card's id
 * @param cards
 *          Array of cards
 * @returns int result
 *          return the index of the card in {cards}
 */
export function findByID(id, cards){
    let result = -1;
    for (let i = 0; i < cards.length; i++){
        if (cards[i].id == id){
            result = i;
        }
    }
    return result;
}

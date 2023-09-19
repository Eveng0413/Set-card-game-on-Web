/**
 * Takes 3 cards and returns whether they are a set or not,
 * according to the rules of the game Set.
 * 
 * @param card1 
 * @param card2 
 * @param card3 
 * @returns boolean isSet
 */
export function verifySet(card1, card2, card3) {

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
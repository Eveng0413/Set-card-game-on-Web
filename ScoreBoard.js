 /** 
 * Display score
 * 
 * @param scoreNum
 *          the score number that will be displayed in scoreboard
 * @returns 
 * 
 * @calls
 */
 export function displayScore(scoreNum) {
  //get element
  var scoreBox = document.getElementById('scoreNum');
  //update content
  scoreBox.textContent = scoreNum;
}






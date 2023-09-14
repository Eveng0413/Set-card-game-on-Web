/**Function Display Score takes in the num of times a set is verified and 
 * sets the score onto index.html
 */
document.addEventListener('DOMContentLoaded', function () {
    //Variable created to get value of the id 
    var scoreBox = document.getElementById('scoreNum');
    function displayScore(scoreNum) {
      //Sets score based on scoreNum Value
      scoreBox.textContent = scoreNum;
    }
    //for testing
    console.log(displayScore(90));
  });
  
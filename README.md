#Project name and introduction
 For the first project in CSE 3901, we created a card game called "Set" in which players need to find a group of cards that satisfy a particular critera. The goal of the game is to find as many sets in the game within a time limit. For our game the time limit is 5 minutes. Also, 12 cards will be faced up in the beginning of the game and when a set is found, the cards that are in set will be replaced. This game is implemented in Javascript for the functionality of the game, and HTML/CSS is used for the front-end. Additionally, we created a hint generator as our additional feature.


#Rules of Set card game

Set is a card game that requires observation and quick thinking. 
In the game, each card has four different attributes: number (one, two, three), 
color (blue, green, purple), shape (diamond, wave, oval), and fill (solid, hollow, shaded). 
The main objective of the game is to find a "set" of three cards from all the cards,
these "sets" need to meet the following rule: for each of the four attributes, 
the three cards must either be exactly the same or completely different.

Ex:
  - If the cards selected are, 3 solid red diamonds, 2 solid green squiggles, and 1 solid purple oval, it is a set because the shadings of the three cards are all the same, while the numbers, the colors, and the shapes among the three cards are all different.

  - if the cards selected are 3 cards where each has a Diamond and each is Red and each card has a different number of diamonds, but two are Striped and one is Filled-in, then it's not a set because the Shading feature condition isn't satisfied.

#How to play the game

At the start of the game, 12 cards are displayed in the middle of the screen. Players start the game and make sets based on the rules and the countdown of five mintues will begin.

If the the player forgets the rules of the game, at the top of the page a button will go to a different page with the rules of the game. As the game progresses, on the left panel a hint will be given, helping the player find a set.

If there are any problem about the game, help can be sought from the help button.

Once the timer is finished, a message board will display the score and time it took to find the sets. Also, the user can click on the new game button on the left pannel to start another game.

If there are any problem about the game, help can be sought from the help button.


The game ends when the countdown ends. 
Finally, players can get the number of sets found through the statistics panel.


#installation instructions
1. download VS code
2. Install an extension called live server
3. Then close vs code and reopen it
4. click on index.html and then click on the go live button in right bottom corner of VS code and the browser will automatically open with the game.




	
	





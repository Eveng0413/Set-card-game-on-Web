# Project name and introduction
 For the first project in CSE 3901, we created a card game called "Set" in which players need to find a group of cards that satisfy a particular critera. The goal of the game is to find as many sets in the game within a time limit. For our game the time limit is 5 minutes. Also, 12 cards will be faced up in the beginning of the game and when a set is found, the cards that are in set will be replaced. This game is implemented in Javascript for the functionality of the game, and HTML/CSS is used for the front-end. Additionally, we created a hint generator as our additional feature.


## Rules of Set card game

Set is a card game that requires observation and quick thinking. 
In the game, each card has four different attributes: number (one, two, three), 
color (blue, green, purple), shape (diamond, wave, oval), and fill (solid, hollow, shaded). 
The main objective of the game is to find a "set" of three cards from all the cards,
these "sets" need to meet the following rule: for each of the four attributes, 
the three cards must either be exactly the same or completely different.

Ex:
  - If the cards selected are, 3 solid red diamonds, 2 solid green squiggles, and 1 solid purple oval, it is a set because the shadings of the three cards are all the same, while the numbers, the colors, and the shapes among the three cards are all different.

  - if the cards selected are 3 cards where each has a Diamond and each is Red and each card has a different number of diamonds, but two are Striped and one is Filled-in, then it's not a set because the Shading feature condition isn't satisfied.

## How to play the game

Before playing, click view rules. At the start of the game click the start game button, and the timer will start the countdown from five minutes. Players start the game and make sets based on the rules.

 As the game progresses, on the left panel the player can click the hint button and a hint will be given, helping the player find a set.

Once the timer is finished the game ends, and a message board will display the score and time it took to find the sets. Also, if the user wants to start a new game then the user should click the new game button on the left hand pannel button and then on start game for the second round to begin.



## Installation instructions
1. Download VS code
2. Install an extension called live server on VS code
3. Then close VS code and reopen it
4. Clone the repository for project 1
5. Click on index.html and then click on the go live button in right bottom corner of VS code and the browser will automatically open with the game.

## Possible installation issues
 1. If the index.html page is not loading, then reinstall live server
 2. If the whole page is frozen and the refresh button is not working and in the console it shows an infinite loop, then close VS code and download live server again

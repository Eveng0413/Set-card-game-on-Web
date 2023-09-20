.js Game of Set
cse 3901 project 1



Detailed rules for the Set game:

Set is a card game that requires observation and quick thinking. 
In the game, each card has four different attributes: number (one, two, three), 
color (blue, green, purple), shape (diamond, wave, oval), and fill (solid, hollow, shaded). 
The main objective of the game is to find a "set" of three cards from all the cards,
 these "sets" need to meet the following rule: for each of the four attributes, 
the three cards must either be exactly the same or completely different.

Game Start: At the start of the game, 12 cards are displayed in the middle of the screen.
 Players start the game and see the countdown time for the game. 
If there are any problem about the game, help can be sought from the help button.

Finding a Set: When a player finds a set, they can click on these three cards in succession.
 If the selected cards meet the set criteria, the cards will be removed from the screen, 
and these three cards will be reshuffled back into the deck. 
Then, the number of cards on the screen is replenished from the deck to restore it to 12.

Game End: The game ends when the countdown ends. 
Finally, players can get the number of sets found through the statistics panel.


installation instructions:
1. download the Oracle VM VirtualBox
	https://www.virtualbox.org/wiki/Downloads
2.download the git on the VirtualBox
3.git clone https://github.com/cse-3901-sharkey/2023-Au-Team-1-Lab-1.git
  or use ssh : git clone git@github.com:cse-3901-sharkey/2023-Au-Team-1-Lab-1.git
4.access the index.html to play the game


Additional Feature List:

Single-player game scoring system, 
game guide and help, 
5-minute countdown timer, 
all features of the Set game (select three cards that meet the Set game criteria,
 pictures are cleared and replaced with new pictures).


Method Directory:
File locations and methods:

(1) initCard.js :
	Card
	generateDeck
	shuffle
	onTable
	printCardsInfo
 	displayCards
	setupClickListeners
(2)ScoreBoard.js
(3)cardReplacing.js :
	backtrack
	cardReplacing
	findByID
(4)findSets.js:
	findAllSets
	findASet
(5)message.js
(6)timer.js:  
	updateDisplay
(7)verifySet.js:
	verifySet
(8)ScoreBoard.css
(9)index.css
(10)rulepage.css
(11)timer.css
(12)ScoreBoard.html
(13)index.html
(14)rule.html
(15)timer.html
(16)folder picture:  81 pictures of set card(all .jpg file)

	
	





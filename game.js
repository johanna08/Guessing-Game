/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
//this should eliminate the vars as global, now they are wrapped in doc ready function

$(document).ready(function() {
var playersGuess,
    winningNumber;
    guesses = [10];
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 10) + 1);
}

winningNumber = generateWinningNumber();


// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	//var price = $('<p>From $399.99</p>');
	//myVar.appendTo($(element));
	var howClose = $('.container h1');
	// var howClose.appendTo($('h2')); 
    if (winningNumber === playerGuess) {
    	howClose.css({"display" : "none"});
    }
    else if (winningNumber > playersGuess) {
    	howClose.text("Aim Higher");
    }
    else {howClose.text("Aim Lower");
	}
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	if ( winningNumber === playersGuess ){
		playerWon();
	}
	else if (guesses[playersGuess] === true) {
      // this number has already been guessed
      $('.guesses_left').find('p').text("That number has already been guessed." + "\n" + "You have " + guesses[0] + " guesses left ");
    }
    else {
      // this number has not been guessed
      guesses[playersGuess] = true;
      guesses[0]--;
      $('.guesses_left').find('p').text("You have " + guesses[0] + " guesses left ");
    }
    // user used all guess attempts, the game is over, Play Again button
    // if (guesses[0] === 0) {
    // 	$('.guesses_left').find('p').text("Guesses all used up, Play Again!");
    // }
    // else {
    //   lowerOrHigher();
    //   updateTemperature();
    // }
  }

function playerWon(won){
	if (won){
		$('h1').text("YOU WON!!");
		$('form').remove();
		$('.button').remove();
		$('.guesses_left').remove();
	}
    else {
    	playerLost();
    }
		playAgain();
}
// Create a provide hint button that provides additional clues to the "Player"

function provideHint(){
	// add code here
}

// Allow the "Player" to Play Again

function playAgain(){
	// add code here
}


/* **** Event Listeners/Handlers ****  */
// Fetch the Players Guess
$('.submit-js').on('click', playersGuessSubmission);

function playersGuessSubmission(){
	playersGuess = +document.getElementById('guess').value;
  	//remove playersGuess data
  	document.getElementById('guess').value = "";
  	//need to make it not end game on 2 submit button presses
  	checkGuess();
}

$('#guess').on('keypress', pressedEnter);

// Runs playerGuessSubmission when the enter key is pressed
function pressedEnter(event) {
	if(event.which === 13)  {
		$('.submit-js').click();
	}
}

});



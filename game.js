/* **** Global Variables **** */
// try to elminate these global variables in your project, these are here just to start.
//this should eliminate the vars as global, now they are wrapped in doc ready function

$(document).ready(function() {
	var playersGuess,
	    winningNumber,
	    guesses = [10];
/* **** Guessing Game Functions **** */

// Generate the Winning Number

function generateWinningNumber(){
	return Math.floor((Math.random() * 100) + 1);
}

winningNumber = generateWinningNumber();

// Fetch the Players Guess
$('.submit-js').on('click', playersGuessSubmission);

function playersGuessSubmission(){
	playersGuess = +$('#guess').val();
  	//remove playersGuess data
  	$('#guess').val('');
  	//need to make it not end game on 2 submit button presses
  	checkGuess();
}
// Determine if the next guess should be a lower or higher number

function lowerOrHigher(){
	if (playersGuess > winningNumber){
		if ((playersGuess - winningNumber) > 20) {
			return "Your guess is Higher and more than 20 digits away from the Winning Number! ";
		}else {
			return "Your guess is Higher than the answer! ";
		} 
	} 
	else if(playersGuess < winningNumber){
		if ((winningNumber - playersGuess) > 20) {
			return "Your guess is Lower and more than 20 digits away from the Winning Number! ";
		}else {
			return "Your guess is Lower than the answer! ";
		} 
	}
}	

function guessMessage(){
	var string;
	//this # has been guessed
	if ( guesses[playersGuess] === true ) { 
		$('.guesses_left').find('p').text("That number has already been guessed." + "You still have " + guesses[0] + " guesses left ");
	} 
	else {
	//this number has not been guessed
		guesses[playersGuess] = true;
      	guesses[0]--;
		string = $('.guesses_left').find('p').text("Try again! " + lowerOrHigher() + "You have " + guesses[0] + " guesses left ");
	}
	return string;
}

// Check if the Player's Guess is the winning number 

function checkGuess(){
	// player guessed correct number, game over, player won
	if ( playersGuess === winningNumber ){
		playerWon();
	}
	// player used all guess attempts, the game is over, Play Again button
	else if (guesses[0] === 0) {
		//add Sad giphy for losing on form, play again
		//append not working for gif...
		$('h1').text("YOU LOSE!!");
		//('h1').append('<iframe src="//giphy.com/embed/Uyl1VRmBCPir6" width="480" height="252" frameBorder="0" class="giphy-embed" allowFullScreen></iframe>');
    	$('h1').append('<img src= images/unhappy-coffee.jpg />');
    	$('.guesses_left').find('p').text("Guesses all used up. Play Again!");
		$('form').remove();
		$('.submit-js').remove();
		$('.hint-js').remove();
    }
	else {
		guessMessage();
	}
}

function playerWon(){
	//add Fun pic or giphy for winning
	$('h1').text("YAY YOU WON!!");
	$('h1').append('<img src= images/happy-coffee.jpg />');
	$('form').remove();
	$('.submit-js').remove();
	$('.guesses_left').remove();
	$('.hint-js').remove();
}


// Create a provide hint button that provides additional clues to the "Player"
$('.hint-js').on('click', provideHint);
//Winning Number = 88
//DOM Message: "One of these values is the winning number, [22,33,88]", submit a guess!"
function provideHint(){
	var randomNum1 = Math.floor((Math.random() * 100) + 1);
	var randomNum2 = Math.floor((Math.random() * 100) + 1);
	$('.guesses_left p').text("One of these values is the winning number [" +randomNum1+" , "+winningNumber+" , "+randomNum2+ "] Submit a guess!");
}

// Allow the "Player" to Play Again
$('.play-js').on('click', playAgain);

function playAgain(){
	location.reload();
}

/* **** Event Listeners/Handlers ****  */

$('#guess').on('keypress', pressedEnter);

// Runs playerGuessSubmission when the enter key is pressed
function pressedEnter(event) {
	if(event.which === 13)  {
		$('.submit-js').click();
	}
}

});


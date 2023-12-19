const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//Starting word to test game
const word = "magnolia";

//new variable for player guesses
const guessedLetters = [];

//Use symbols as placeholders for letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

placeholder(word);

//add an eventListener for the button
guessLetterButton.addEventListener("click", function (e){
    e.preventDefault();
    //empty text of message element
    message.innerText = "";
      // grab what was entered in the input
  const guess = letterInput.value;
  // Make sure it is a single letter
  const goodGuess = validateInput(guess);

  if (goodGuess) {
    // We've got a letter! Let's guess!
    makeGuess(guess);
  }
  letterInput.value = "";
});

//create a function to check the players input
const validateInput = function (input) {
    const acceptedLetter = /[a-zA-Z]/;
    if (input.length === 0){
        message.innerText = "Please enter a letter";
    } else if (input.length > 1) {
        message.innerText = "Oops! Please enter one letter";
    } else if (!input.match(acceptedLetter)) {
        message.innerText = "Please enter a letter from A-Z";
    } else {
        return input;
    }
};

//create a function to capture the input 
const makeGuess = function (guess) {
    guess = guess.toUpperCase ();
    if (guessedLetters.includes(guess)){
        message.innerText = "You've already tried that letter, please try again."
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
    }
};

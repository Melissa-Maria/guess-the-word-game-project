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
        //call the showGuessedLetters function
        showGuessedLetters();
        //call updateWordInProgress function
        updateWordInProgress(guessedLetters);
    }
}; 

//create a function to update the page with the guessed letters
const showGuessedLetters = function () {
    //empty the innerHTML of the unordered list 
    guessedLettersElement.innerHTML = "";
    //create a new list item for each item in guessedLetters array
    for (const letter of guessedLetters) {
        const li = document.createElement("li");
        li.innerText = letter;
        guessedLettersElement.append(li);
    }
};

//create a function to update the word in progress
const updateWordInProgress = function (guessedLetters) {
    //create variable to change word to upper case
    const wordUpper = word.toUpperCase();
    //split the word string into an array so the letter can appear in guessedLetters array
    const wordArray = wordUpper.split("");
    //console.log(wordArray);
    //check if wordArray contains any letters from guessedLetters array 
    const revealWord = [];
    for (letter of wordArray) {
        if (guessedLetters.includes(letter)){
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//create a function to tell if the player won
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        //add win class to empty paragraph where messages appear when player guesses letter
        message.classList.add("win");
        // update paragraphs contents
        message.innerHTML = `<p class="highlight">You guessed correct the word! Congrats!</p>`;
    }
};
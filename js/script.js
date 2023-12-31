const guessedLettersElement = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuessesElement = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const message = document.querySelector(".message");
const playAgainButton = document.querySelector(".play-again");

//Starting word to test game
let word = "magnolia";
//new variable for player guesses
let guessedLetters = [];
//create global variable for number of guesses
let remainingGuesses = 8;

//create an async function
const getWord = async function () {
    const response = await fetch("https://gist.githubusercontent.com/skillcrush-curriculum/7061f1d4d3d5bfe47efbfbcfe42bf57e/raw/5ffc447694486e7dea686f34a6c085ae371b43fe/words.txt");
    const words = await response.text();
    //getWord();
    //console.log(words);
    const wordArray = words.split("\n");
    //console.log(wordArray);
    const randomIndex = Math.floor(Math.random() * wordArray.length);
    word = wordArray[randomIndex].trim();
    placeholder(word);
};

getWord();

//Use symbols as placeholders for letters
const placeholder = function (word) {
    const placeholderLetters = [];
    for (const letter of word) {
        //console.log(letter);
        placeholderLetters.push("●");
    }
    wordInProgress.innerText = placeholderLetters.join("");
};

//add an eventListener for the button
guessLetterButton.addEventListener("click", function (e) {
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
    if (input.length === 0) {
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
    guess = guess.toUpperCase();
    if (guessedLetters.includes(guess)) {
        message.innerText = "You've already tried that letter, please try again.";
    } else {
        guessedLetters.push(guess);
        console.log(guessedLetters);
         //call updateRemaingGuesses function 
        updateGuessesRemaining(guess);
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
    for ( const letter of wordArray) {
        if (guessedLetters.includes(letter)) {
            revealWord.push(letter.toUpperCase());
        } else {
            revealWord.push("●");
        }
    }
    wordInProgress.innerText = revealWord.join("");
    checkIfWin();
};

//create a function to count guesses remaining
const updateGuessesRemaining = function (guess) {
    // grab word and make it upperCase
    const upperWord = word.toUpperCase();
    //find out if the word contains guess
    if (!upperWord.includes(guess)) {
        message.innerText = `Sorry there is no ${guess} in the word`;
        remainingGuesses -= 1;
    } else {
        message.innerText = `Great job! The word has the letter ${guess}`;
    }

    if (remainingGuesses === 0) {
        message.innerHTML = `Game over. The word was <span class="highlight">${word}</span>.`;
        startOver();
    } else if (remainingGuesses === 1) {
        remainingGuessesSpan.innerText = `${remainingGuesses} guess`;
      } else {
        remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
      }
};

//create a function to tell if the player won
const checkIfWin = function () {
    if (word.toUpperCase() === wordInProgress.innerText) {
        //add win class to empty paragraph where messages appear when player guesses letter
        message.classList.add("win");
        // update paragraphs contents
        message.innerHTML = `<p class="highlight">You guessed the word! Congrats!</p>`;

        startOver();
    }
};

const startOver = function () {
        guessLetterButton.classList.add("hide");
        remainingGuessesElement.classList.add("hide");
        guessedLettersElement.classList.add("hide");
        playAgainButton.classList.remove("hide");
};

playAgainButton.addEventListener("click", function () {
    message.classList.remove("win");
    guessedLetters = [];
    remainingGuesses = 8;
    remainingGuessesSpan.innerText = `${remainingGuesses} guesses`;
    guessedLettersElement.innerHTML = "";
    message.innerText = "";

    getWord();

    guessLetterButton.classList.remove("hide");
    remainingGuessesElement.classList.remove("hide");
    guessedLettersElement.classList.remove("hide");
    playAgainButton.classList.add("hide");

});


const guessedLetters = document.querySelector(".guessed-letters");
const guessLetterButton = document.querySelector(".guess");
const letterInput = document.querySelector(".letter");
const wordInProgress = document.querySelector(".word-in-progress");
const remainingGuesses = document.querySelector(".remaining");
const remainingGuessesSpan = document.querySelector(".remaining span");
const messages = document.querySelector(".messages");
const playAgainButton = document.querySelector(".play-again");

//Starting word to test game
const word = "magnolia";

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
    const guess = letterInput.value;
    console.log(guess);
    letterInput.value = ""; 
});

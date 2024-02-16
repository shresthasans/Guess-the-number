"use strict";

let selectCheckButton = document.querySelector(".check");
let selectAgainButton = document.querySelector(".again");
let inputBox = document.querySelector(".guess");
let hintMessage = document.querySelector(".message");
let pageBody = document.getElementsByTagName("body")[0];
let score = document.querySelector(".score");
let highScore = document.querySelector(".highscore");

inputBox.value = 0;
selectCheckButton.disabled = false;

let generateRandomNum = function () {
  return Math.floor(Math.random() * 21);
};

let disableCheckBtn = (el, boolenVal, cssVal) => {
  el.disabled = boolenVal;
  el.style.cssText = cssVal;
};
let defaultValue = generateRandomNum();

selectCheckButton.addEventListener("click", function (el) {
  let inputValue = inputBox.value;
  let currentChance = score.textContent;
  let correctGuess = (score.textContent = currentChance - 1);

  if (Number(inputValue) > 20 || Number(inputValue) < 0) {
    hintMessage.style.color = "#FF0000";
    hintMessage.textContent = `Please guess number between 1 and 20`;
  } else if (Number(inputValue) > defaultValue) {
    hintMessage.textContent = "You guessed high";
    hintMessage.style.color = "#00d3ff";
  } else if (Number(inputValue) < defaultValue) {
    hintMessage.textContent = "You guessed low";
    hintMessage.style.color = "#ffa500";
  } else if (defaultValue === Number(inputValue)) {
    hintMessage.textContent = "🎉 Correct guess";
    pageBody.classList.add("bg-green");
    pageBody.classList.remove("bg-grey-dark");
    highScore.textContent = correctGuess;
    disableCheckBtn(selectCheckButton, true, "opacity:0.5; cursor:default;");
    selectAgainButton.textContent = "Play again";
    inputBox.disabled = true;
  } else {
    correctGuess;
  }

  if (currentChance <= 0) {
    hintMessage.textContent = `You lose. Please "Restart" the game`;
    disableCheckBtn(selectCheckButton, true, "opacity:0.5; cursor:default;");
    inputBox.disabled = true;
  }
});

selectAgainButton.addEventListener("click", () => {
  defaultValue = generateRandomNum();
  hintMessage.textContent = "Start guessing...";
  hintMessage.style.color = "#eee";
  inputBox.value = 0;
  selectAgainButton.textContent = "Restart";
  disableCheckBtn(selectCheckButton, false, "opacity:true; cursor:pointer;");
  score.textContent = 20;
  inputBox.disabled = false;
  pageBody.classList.remove("bg-green");
  pageBody.classList.add("bg-grey-dark");
});

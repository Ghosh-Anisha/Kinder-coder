var prog_lang = [
	"python",
	"javascript",
	"java",
	"c",
	"csharp",
	"kotlin",
  "sql",
  "php",
  "swift",
	"ruby"
]

let ansarray = '';
let maxWrong = 6;
let wrongguess = 0;
let userguess = [];
let wordStatus = null;

function randomWord() {
  ansarray = prog_lang[Math.floor(Math.random() * prog_lang.length)];
}

function generateButtons() {
  let buttonsHTML = 'abcdefghijklmnopqrstuvwxyz'.split('').map(letter =>
    `
      <button
        class="btn btn-lg btn-primary m-2"
        id='` + letter + `'
        onClick="handleGuess('` + letter + `')"
      >
        ` + letter + `
      </button>
    `).join('');

  document.getElementById('keyboard').innerHTML = buttonsHTML;
}

function handleGuess(userchoice) {
  userguess.indexOf(userchoice) === -1 ? userguess.push(userchoice) : null;
  document.getElementById(userchoice).setAttribute('disabled', true);

  if (ansarray.indexOf(userchoice) >= 0) {
    userguessWord();
    checkIfGameWon();
  } else if (ansarray.indexOf(userchoice) === -1) {
    wrongguess++;
    updateWrongguess();
    checkIfGameLost();
    updateHangmanPicture();
  }
}

function updateHangmanPicture() {
  document.getElementById('hangmanPic').src = './images/' + wrongguess + '.jpg';
}

function checkIfGameWon() {
  if (wordStatus === ansarray) {
    document.getElementById('keyboard').innerHTML = 'You Won!';
  }
}

function checkIfGameLost() {
  if (wrongguess === maxWrong) {
    document.getElementById('wordSpotlight').innerHTML = 'The ansarray was: ' + ansarray;
    document.getElementById('keyboard').innerHTML = 'You Lost!';
  }
}

function userguessWord() {
  wordStatus = ansarray.split('').map(letter => (userguess.indexOf(letter) >= 0 ? letter : " _ ")).join('');

  document.getElementById('wordSpotlight').innerHTML = wordStatus;
}

function updateWrongguess() {
  document.getElementById('wrongguess').innerHTML = wrongguess;
}

function reset() {
  wrongguess = 0;
  userguess = [];
  document.getElementById('hangmanPic').src = './images/0.jpg';

  randomWord();
  userguessWord();
  updateWrongguess();
  generateButtons();
}

document.getElementById('maxWrong').innerHTML = maxWrong;

randomWord();
generateButtons();
userguessWord();

'use strict';

const dice = document.querySelector('.dice');
const diceRollBtn = document.querySelector('.btn--roll');
const holdBtn = document.querySelector('.btn--hold');
const newGame = document.querySelector('.btn--new');
// const scoreEl0 = (document.getElementById('score--0').textContent = 0);
// const scoreEl1 = (document.getElementById('score--1').textContent = 0);
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');

let activePlayer, currentScore, playing;
let score = [0, 0];

//FUNCTIONS
const init = function () {
  activePlayer = 0;
  currentScore = 0;
  playing = true;
  score = [0, 0];

  const scoreEl0 = (document.getElementById('score--0').textContent = 0);
  const scoreEl1 = (document.getElementById('score--1').textContent = 0);
  const current0 = (document.getElementById('current--0').textContent = 0);
  const current1 = (document.getElementById('current--1').textContent = 0);

  dice.classList.add('hidden');
  player0.classList.remove('player--winner');
  player1.classList.remove('player--winner');
  player0.classList.add('player--active');
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  //switch active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  //toggle active-player class
  player0.classList.toggle('player--active');
  player1.classList.toggle('player--active');
};

const rollDice = function () {
  //random index for dice
  const randomDice = Math.floor(Math.random() * 6) + 1;
  dice.src = `images/dice-${randomDice}.png`;
  dice.classList.remove('hidden');
  // check if 1 is rolled
  if (randomDice === 1) {
    switchPlayer();
  } else {
    currentScore += randomDice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  }
};

const holdScore = function () {
  //add cuurent score to total score
  score[activePlayer] += currentScore;
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  //check if score is equals or greater than 100
  if (score[activePlayer] >= 100) {
    //current player wins
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.remove('player--active');
  } else {
    //switch player
    switchPlayer();
  }
};

//EVENT LISTENERS
diceRollBtn.addEventListener('click', rollDice);

holdBtn.addEventListener('click', holdScore);

newGame.addEventListener('click', init);

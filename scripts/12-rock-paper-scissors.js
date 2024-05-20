// Retrieve the saved score or start at 0 if first time
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Display correct score once webpage loads
updateScoreElement();

// Handles user click on rock button
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('rock');
  });

// Handles user click on paper button
document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('paper');
  });

// Handles user click on scissors button
document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('scissors');
  }); 

// Handles user click on reset score button
document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.removeItem('score');
    updateScoreElement();
  });

// Handles user click on auto play button
document.querySelector('.js-auto-play-button')
  .addEventListener('click', () => {
    autoPlay();
  });

document.body.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'r') {
    playGame('rock');
  } else if (key === 'p') {
    playGame('paper');
  } else if (key === 's') {
    playGame('scissors');
  }
});

/**
 * Plays the rock paper scissors game given a user choice
 * @param {*} playerMove User choice of rock, paper, or scissors
 */
function playGame(playerMove) {
  const computerMove = pickComputerMove();

  let result = '';

  if (playerMove == 'scissors') {
    if (computerMove === 'rock') {
      result = 'You lose.';
    } else if (computerMove === 'paper') {
      result = 'You win.';
    } else if (computerMove === 'scissors') {
      result = 'Tie.';
    }

  } else if (playerMove == 'paper') {
    if (computerMove === 'rock') {
      result = 'You win.';
    } else if (computerMove === 'paper') {
      result = 'Tie.';
    } else if (computerMove === 'scissors') {
      result = 'You lose.';
    }
    
  } else if (playerMove == 'rock') {
    if (computerMove === 'rock') {
      result = 'Tie.';
    } else if (computerMove === 'paper') {
      result = 'You lose.';
    } else if (computerMove === 'scissors') {
      result = 'You win.';
    }
  }

  if (result === 'You win.') {
    score.wins++;
  } else if (result === 'You lose.') {
    score.losses++;
  } else if (result === 'Tie.') {
    score.ties++;
  }

  // Save the score to local storage
  localStorage.setItem('score', JSON.stringify(score));
  
  // Update the score on the webpage
  updateScoreElement();

  // Update result of game on the webpage
  document.querySelector('.js-result')
    .innerHTML = result;
    
  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="images/${playerMove}-emoji.png" class="move-icon">
<img src="images/${computerMove}-emoji.png" class="move-icon">
Computer`;
}

/**
 * Determines a random computer selection of either rock, paper, or scissors
 * @returns either 'rock', 'paper', or 'scissors'
 */
function pickComputerMove() {
  const randomNumber = Math.random();

  let computerMove = '';

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'paper';
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = 'scissors';
  }

  return computerMove;
}

/**
 * Updates the score on the webpage
 */
function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;
const buttonElement = document.querySelector('.js-auto-play-button');

/**
 * Computer plays against itself
 */
function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(() => {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    buttonElement.innerHTML = 'Stop Playing';
    
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    buttonElement.innerHTML = 'Auto Play';
  }
}
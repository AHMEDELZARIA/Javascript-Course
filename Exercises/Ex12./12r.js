// Retrieve the saved score or start at 0 if first time
let score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

updateScoreElement();

document.querySelector('.js-rock-button')
  .addEventListener('click', () => playGame('rock'));

document.querySelector('.js-paper-button')
  .addEventListener('click', () => playGame('paper'));

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => playGame('scissors')); 

document.querySelector('.js-reset-score-button')
  .addEventListener('click', () => showResetConfirmation());

document.body.addEventListener('keydown', (event) => {
  const key = event.key;

  if (key === 'r') {
    playGame('rock');

  } else if (key === 'p') {
    playGame('paper');

  } else if (key === 's') {
    playGame('scissors');

  } else if (key === 'a') {
    autoPlay();

  } else if (key === 'Backspace') {
    showResetConfirmation();
  }
});

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

  localStorage.setItem('score', JSON.stringify(score));
  
  updateScoreElement();

  document.querySelector('.js-result')
    .innerHTML = result;
    
  document.querySelector('.js-moves')
    .innerHTML = `You
<img src="${playerMove}-emoji.png" class="move-icon">
<img src="${computerMove}-emoji.png" class="move-icon">
Computer`;
}

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

function updateScoreElement() {
  document.querySelector('.js-score')
  .innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

let isAutoPlaying = false;
let intervalId;
const buttonElement = document.querySelector('.js-auto-play-button');

buttonElement
  .addEventListener('click', () => autoPlay());


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

function showResetConfirmation() {
  document.querySelector('.js-reset-score-confirmation')
    .innerHTML = `
      <div style="display: inline-block">Are you sure you want to reset the score?</div>
      <button class="js-yes-button reset-confirmation-button">Yes</div>
      <button class="js-no-button reset-confirmation-button">No</button>
    `;

  document.querySelector('.js-yes-button')
    .addEventListener('click', () => {
      resetScore();
      hideResetConfirmation();
    });

  document.querySelector('.js-no-button')
    .addEventListener('click', () => hideResetConfirmation());
}

function resetScore() {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem('score');
  updateScoreElement();
}

function hideResetConfirmation() {
  document.querySelector('.js-reset-score-confirmation')
    .innerHTML = '';
}
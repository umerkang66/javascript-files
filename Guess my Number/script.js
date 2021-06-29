'use strict';

/*
console.log(document.querySelector('.message').textContent);

document.querySelector('.message').textContent = '🎉 Correct Number!';

console.log(document.querySelector('.message').textContent);

document.querySelector('.number').textContent = 13;
document.querySelector('.score').textContent = 10;

document.querySelector('.guess').value = 23;
console.log(document.querySelector('.guess').value);
*/

let secretNumber = Math.trunc(Math.random() * 20) + 1;
let score = 20;
let highScore = 0;

const displayMessage = function (message) {
  document.querySelector('.message').textContent = message;
};

document.querySelector('.check').addEventListener('click', function () {
  const guess = Number(document.querySelector('.guess').value);
  console.log(guess, typeof guess);

  // when there is no input
  if (!guess) {
    // document.querySelector('.message').textContent = '⛔ No number';
    displayMessage('⛔ No number');

    // when player wins
  } else if (guess === secretNumber) {
    document.querySelector('.number').textContent = secretNumber;
    // document.querySelector('.message').textContent = '🎉 Correct Number';
    displayMessage('🎉 Correct Number');

    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';

    if (score > highScore) {
      highScore = score;
      document.querySelector('.highscore').textContent = highScore;
    }

    // when guess is wrong
  } else if (guess !== secretNumber) {
    if (score > 1) {
      // document.querySelector('.message').textContent =
      // guess > secretNumber ? '📈 Too high!' : '📉 Too low!';
      displayMessage(guess > secretNumber ? '📈 Too high!' : '📉 Too low!');

      score--;
      document.querySelector('.score').textContent = score;
    } else {
      // document.querySelector('.message').textContent = '💥 You lost the game';
      displayMessage('💥 You lost the game');

      document.querySelector('.score').textContent = 0;
    }
  }

  // when the score is high
  // } else if (guess > secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📈 Too high!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lost the game';
  //     document.querySelector('.score').textContent = 0;
  //   }

  //   // when the score is low
  // } else if (guess < secretNumber) {
  //   if (score > 1) {
  //     document.querySelector('.message').textContent = '📉 Too low!';
  //     score--;
  //     document.querySelector('.score').textContent = score;
  //   } else {
  //     document.querySelector('.message').textContent = '💥 You lost the game';
  //     document.querySelector('.score').textContent = 0;
  //   }
  // }
});

// CODING CHALLENGE
/*
Implement a game rest functionality, so that the player can make a new guess!
Your tasks:
1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the 'score' and
'secretNumber' variables
3. Restore the initial conditions of the message, number, score and guess input
fields
4. Also restore the original background color (#222) and number width (15rem)
*/

document.querySelector('.again').addEventListener('click', function () {
  // restoring varialbes
  score = 20;
  secretNumber = Math.trunc(Math.random() * 20) + 1;
  // restoring the initial conditions
  // of .message
  // document.querySelector('.message').textContent = 'Start guessing...';
  displayMessage('Start guessing...');

  // of .number
  document.querySelector('.number').textContent = '?';
  // of .score
  document.querySelector('.score').textContent = score;
  // of guess input
  document.querySelector('.guess').value = '';
  // restoring the background color of body
  document.querySelector('body').style.backgroundColor = '#222';
  // restoring the initial number width
  document.querySelector('.number').style.width = '15rem';
  return secretNumber;
});

/* eslint-env browser */

// *****************
// VARIABLES
// *****************
const cards = document.querySelectorAll('.main__card');
const cardsIcons = document.querySelectorAll('.card__icon');
const buttonNewGame = document.querySelector('.main__new-game');


// *****************
// FUNCTIONS
// *****************

// On card click
const clicked = (e) => { e.target.style.background = 'red'; };

// New game
const newGame = () => {
  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  const shuffleArray = (array) => {
    const output = array.slice(0);
    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      const temp = output[i];
      output[i] = output[j];
      output[j] = temp;
    }
    return output;
  };

  const randomCardsIndexes = shuffleArray(indexes);
  const classNames = ['maki-airport', 'maki-art-gallery', 'maki-bar', 'maki-baseball', 'maki-cinema', 'maki-college', 'maki-harbor', 'maki-town-hall'];

  randomCardsIndexes.forEach((randomIndex, i) => {
    if (i % 2 === 0) {
      cardsIcons[randomIndex].className = `card__icon ${classNames[i / 2]}`;
    } else {
      cardsIcons[randomIndex].className = `card__icon ${classNames[(i - 1) / 2]}`;
    }
  });
};


// *****************
// EVENT LISTENERS
// *****************

// Clicking on cards
cards.forEach(card => card.addEventListener('click', clicked));

// Clicking on New Game button
buttonNewGame.addEventListener('click', newGame);

/* eslint-env browser */

// *****************
// VARIABLES
// *****************
const cards = document.querySelectorAll('.main__card');
const buttonNewGame = document.querySelector('.main__new-game');


// *****************
// FUNCTIONS
// *****************

// On card click
const clicked = (e) => { e.target.style.background = 'red'; };

// New game
const newGame = () => {
  const cardsIndexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const classNames = ['maki-airport', 'maki-art-gallery', 'maki-bar', 'maki-baseball', 'maki-cinema', 'maki-college', 'maki-harbor', 'maki-town-hall'];
  const newPairs = [];
  const getRandom = max => Math.floor(Math.random() * max);

  cards.forEach((card) => { card.firstChild.className = 'card__icon'; });

  for (let i = 0; i < 8; i += 1) {
    let randomIndex = getRandom(cardsIndexes.length);

    newPairs.push(cardsIndexes[randomIndex]);
    cardsIndexes.splice(randomIndex, 1);
    randomIndex = Math.floor(Math.random() * (cardsIndexes.length));
    newPairs.push(cardsIndexes[randomIndex]);
    cardsIndexes.splice(randomIndex, 1);
  }

  newPairs.forEach((num, j) => {
    if (j % 2 === 0) {
      const className = classNames[j / 2];
      cards[num].firstChild.classList.add(className);
      cards[num + 1].firstChild.classList.add(className);
    }
  });

  console.log(newPairs);
};


// *****************
// EVENT LISTENERS
// *****************

// Clicking on cards
cards.forEach(card => card.addEventListener('click', clicked));

// Clicking on New Game button
buttonNewGame.addEventListener('click', newGame);

/* eslint-env browser */

// *****************
// VARIABLES
// *****************
const cards = document.querySelectorAll('.main__card');
const cardsIcons = document.querySelectorAll('.card__icon');
const buttonNewGame = document.querySelector('.main__new-game');
const numberOfTurns = document.querySelector('.main__turns');


// *****************
// FUNCTIONS
// *****************

// Shuffle cards
const shuffleCards = () => {
  const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const classNames = ['maki-airport', 'maki-art-gallery', 'maki-bar', 'maki-baseball', 'maki-cinema', 'maki-college', 'maki-harbor', 'maki-town-hall'];

  // Function to shuffle cards indexes
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

  // Applying icons to random indexes
  randomCardsIndexes.forEach((randomIndex, i) => {
    if (i % 2 === 0) {
      cardsIcons[randomIndex].className = `card__icon ${classNames[i / 2]}`;
    } else {
      cardsIcons[randomIndex].className = `card__icon ${classNames[(i - 1) / 2]}`;
    }
  });
};

// Print number of moves
const printMoves = (num) => {
  numberOfTurns.textContent = num + (num === 1 ? ' Move' : ' Moves');
};

// Local scope for each new game
const newGame = () => {
  let activeCard = null;
  let movesNumber = 0;

  shuffleCards();
  printMoves(movesNumber);

  // Remove all temporary classes
  cards.forEach((card) => {
    card.classList.remove('card__active', 'card__pair');
  });

  // On card click
  const clicked = (e) => {
    if (activeCard) {
      if (e.target === activeCard) {
        activeCard.classList.remove('card__active');
        activeCard = null;
        movesNumber += 1;
        printMoves(movesNumber);
      } else if (e.target.firstElementChild.className === activeCard.firstElementChild.className) {
        e.target.classList.add('card__pair');
        activeCard.classList.add('card__pair');
        activeCard.classList.remove('card__active');
        e.target.removeEventListener('click', clicked);
        activeCard.removeEventListener('click', clicked);
        activeCard = null;
        movesNumber += 1;
        printMoves(movesNumber);
      } else {
        activeCard.classList.remove('card__active');
        activeCard = null;
        movesNumber += 1;
        printMoves(movesNumber);
      }
    } else {
      activeCard = e.target;
      activeCard.classList.add('card__active');
    }
  };

  // Clicking on cards
  cards.forEach(card => card.addEventListener('click', clicked));
};

// *****************
// EVENT LISTENERS
// *****************

// Clicking on New Game button
buttonNewGame.addEventListener('click', newGame);

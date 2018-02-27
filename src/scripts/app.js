/* eslint-env browser */

const cards = document.querySelectorAll('.main__card');
const cardsIcons = document.querySelectorAll('.card__icon');
const buttonNewGame = document.querySelector('.main__new-game');
const numberOfTurns = document.querySelector('.main__turns');


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

  // On card click
  const clicked = (e) => {
    if (activeCard) {
      // Every click after selecting any card will be counted as one move

      // Clicking on the same card will remove its selection
      if (e.target === activeCard) {
        activeCard.classList.remove('card__flipped');
        activeCard = null;
        movesNumber += 1;
        printMoves(movesNumber);

        // Got a pair, it'll mark them and remove event listeners
      } else if (e.target.querySelector('.card__icon').className === activeCard.querySelector('.card__icon').className) {
        e.target.classList.add('card__flipped');
        setTimeout(() => {
          e.target.classList.add('tada');
          activeCard.classList.add('tada');
          activeCard = null;
        }, 700);
        e.target.removeEventListener('click', clicked);
        activeCard.removeEventListener('click', clicked);
        movesNumber += 1;
        printMoves(movesNumber);

        // Wrong pair, remove selection from the both cards
      } else {
        e.target.classList.add('card__flipped');

        setTimeout(() => {
          activeCard.classList.remove('card__flipped');
          e.target.classList.remove('card__flipped');
          activeCard = null;
        }, 700);

        movesNumber += 1;
        printMoves(movesNumber);
      }

      // Mark a card as selected one
    } else {
      activeCard = e.target;
      activeCard.classList.add('card__flipped');
    }
  };

  // Calling functions to start the game
  shuffleCards();
  printMoves(movesNumber);

  // Remove all temporary classes
  cards.forEach((card) => {
    card.classList.remove('card__flipped', 'tada');
  });

  // Clicking on cards
  cards.forEach(card => card.addEventListener('click', clicked));
};

// Clicking on New Game button
buttonNewGame.addEventListener('click', newGame);

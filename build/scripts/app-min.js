/* eslint-env browser */

// IIFE for a local scope for a new game
(function autorun() {
  const cards = document.querySelectorAll('.main__card');
  const cardsIcons = document.querySelectorAll('.card__icon');
  const buttonsNewGame = document.querySelectorAll('.main__new-game');
  const numberOfTurns = document.querySelectorAll('.main__turns');
  const modal = document.querySelector('.main__modal');
  const board = document.querySelector('.main__board');
  const stars = document.querySelectorAll('.main__star');
  const modalStars = document.querySelectorAll('.modal__star');
  const timer = document.querySelector('.main__timer');
  const modalTimer = document.querySelector('.modal__timer');

  let activeCard = null;
  let movesNumber = 0;
  let pairsFounded = 0;
  let totalTime = 0;
  let canClick = true; // to prevent clicking on another cards while animation
  let timerId;

  // Responsible board size
  const responsive = () => {
    const width = board.offsetWidth;
    const height = board.offsetHeight;

    if (height > width) {
      board.style.height = `${width}px`;
    } else if (width > height) {
      board.style.width = `${height}px`;
    }
  };

  // Shuffle cards
  const shuffleCards = () => {
    const indexes = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
    const classNames = [
      'maki-airport',
      'maki-art-gallery',
      'maki-bar',
      'maki-baseball',
      'maki-cinema',
      'maki-college',
      'maki-harbor',
      'maki-town-hall',
    ];

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
        cardsIcons[randomIndex].className = `card__icon ${
          classNames[(i - 1) / 2]
        }`;
      }
    });
  };

  // Print number of moves
  const printMoves = (num) => {
    numberOfTurns.forEach((text) => {
      text.textContent = num + (num === 1 ? ' Move' : ' Moves');
    });
  };

  // Changing rating
  const rating = (moves) => {
    if (moves > 14) {
      if (moves < 20) {
        stars[2].textContent = '☆';
        modalStars[2].textContent = '☆';
      } else if (moves < 25) {
        stars[1].textContent = '☆';
        modalStars[1].textContent = '☆';
      } else if (moves < 30) {
        stars[0].textContent = '☆';
        modalStars[0].textContent = '☆';
      }
    }
  };

  // Print time
  const printTime = (time) => {
    timer.textContent = time;
    modalTimer.textContent = time;
  };

  // Clock function
  const clock = (action) => {
    if (action === 'start') {
      timerId = setInterval(() => {
        totalTime += 1;
        printTime(`${Math.floor(totalTime / 60)}:${totalTime % 60}`);
      }, 1000);
    } else if (action === 'end') {
      clearInterval(timerId);
    }
  };

  // On card click
  const clicked = (e) => {
    if (activeCard && canClick) {
      // Every click after selecting any card will be counted as one move
      rating(movesNumber);

      // Clicking on the same card will remove its selection
      if (e.target === activeCard) {
        activeCard.classList.remove('card__flipped');
        canClick = false;
        activeCard = null;
        movesNumber += 1;
        printMoves(movesNumber);
        setTimeout(() => {
          canClick = true;
        }, 300);

        // Got a pair, it'll mark them and remove event listeners
      } else if (
        e.target.querySelector('.card__icon').className ===
        activeCard.querySelector('.card__icon').className
      ) {
        e.target.classList.add('card__flipped');
        canClick = false;
        setTimeout(() => {
          e.target.classList.add('rubber');
          activeCard.classList.add('rubber');
          activeCard = null;
          setTimeout(() => {
            canClick = true;
          }, 300);
          if (pairsFounded === 8) {
            clock('end');
            setTimeout(() => {
              modal.classList.add('modal__active');
            }, 700);
          }
        }, 700);
        e.target.classList.add('card__no-events');
        activeCard.classList.add('card__no-events');
        movesNumber += 1;
        pairsFounded += 1;
        printMoves(movesNumber);

        // Wrong pair, remove selection from the both cards
      } else {
        e.target.classList.add('card__flipped');
        canClick = false;

        /* Somehow 'shake' and 'card__flipped' transforms are interacting.
          So I made an extra setTimeout with 100ms to prevent bugs.
          Other timeouts are needed to change classes, each transformation lasts 700ms */
        setTimeout(() => {
          e.target.classList.add('shake');
          activeCard.classList.add('shake');

          // Do after shake animation
          setTimeout(() => {
            activeCard.classList.remove('shake');
            e.target.classList.remove('shake');
            setTimeout(() => {
              activeCard.classList.remove('card__flipped');
              e.target.classList.remove('card__flipped');
              activeCard = null;
              setTimeout(() => {
                canClick = true;
              }, 200);
            }, 100);
          }, 700);
        }, 700);

        movesNumber += 1;
        printMoves(movesNumber);
      }

      // Mark a card as selected one
    } else if (canClick) {
      activeCard = e.target;
      canClick = false;
      activeCard.classList.add('card__flipped');
      setTimeout(() => {
        canClick = true;
      }, 300);
    }
  };

  // New game
  const newGame = () => {
    activeCard = null;
    movesNumber = 0;
    pairsFounded = 0;
    totalTime = 0;

    clock('end');
    printTime(totalTime);

    // Calling responsible size of the main board function
    responsive();

    // Calling functions to start the game
    shuffleCards();
    printMoves(movesNumber);

    // Remove all temporary classes and showing cards for 3 seconds
    modal.classList.remove('modal__active');
    canClick = false;
    cards.forEach((card) => {
      card.classList.remove(
        'shake',
        'card__flipped',
        'card__no-events',
        'rubber',
      );

      // Timeout is needed to do properly opening animation to previously opened cards
      setTimeout(() => {
        card.classList.add('card__flipped');

        // Timer to show cards at the start of the game
        setTimeout(() => {
          card.classList.remove('card__flipped');
        }, 5000); // number of milliseconds to show the cards at the start of the game
      }, 0);
    });

    setTimeout(() => {
      canClick = true;
      clock('start');
    }, 5300);
  };

  // Clicking on New Game button
  buttonsNewGame.forEach((buttonNewGame) => {
    buttonNewGame.addEventListener('click', newGame);
  });

  // Clicking on cards
  cards.forEach((card) => {
    card.addEventListener('click', clicked);
  });

  // Starting a new game
  newGame();
}());

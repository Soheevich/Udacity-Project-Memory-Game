/* eslint-env browser */

const cards = document.querySelectorAll('.main__card');

const clicked = (e) => { e.target.style.background = 'red'; };

cards.forEach(card => card.addEventListener('click', clicked));

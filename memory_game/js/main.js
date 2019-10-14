const cards = [
    {
        rank: "queen",
        suit: "hearts",
        cardImage: "images/queen-of-hearts.png"
    },
    {
        rank: "queen",
        suit: "diamonds",
        cardImage: "images/queen-of-diamonds.png"
    },
    {
        rank: "king",
        suit: "hearts",
        cardImage: "images/king-of-hearts.png"
    },
    {
        rank: "king",
        suit: "diamonds",
        cardImage: "images/king-of-diamonds.png"
    }
];
const cardsInPlay = [];
const randomIterator = [];
let score = [0, 0];
const scoreMatch = document.querySelector('.score__match span');
const scoreMismatch = document.querySelector('.score__mismatch span');
const modal = document.getElementsByClassName('modal')[0];
const againButton = document.querySelector('.modal button');
const resetButton = document.querySelector('.reset');

function checkForMatch() {
    modal.style.visibility = 'visible';
    if (cardsInPlay[0].rank === cardsInPlay[1].rank) {
        //console.log("You found a match!");
        score[0]++;
        scoreMatch.textContent = score[0].toString();
        //alert("You found a match!");
        modal.classList.add('matched');
    } else {
        //console.log("Sorry, try again.");
        score[1]++;
        scoreMismatch.textContent = score[1].toString();
        modal.classList.add('mismatched');
        //alert("Sorry, try again.");
    }
    cardsInPlay.length = 0;
}

function flipCard() {
    const cardId = this.getAttribute('data-id');
    console.log("User flipped " + cards[cardId].rank);
    if (!cardsInPlay[0] || cardsInPlay[0].id !== cardId) {
        cardsInPlay.push({rank: cards[cardId].rank, id: cardId});
    }
    console.log(`Path: ${cards[cardId].cardImage}\nSuit: ${cards[cardId].suit}`);
    this.setAttribute('src', cards[cardId].cardImage);

    if (cardsInPlay.length === 2) {
        checkForMatch();
    }
}

function createBoard() {
    randomCards();
    for (let i = 0; i < cards.length; i++) {
        let cardElement = document.createElement('img');
        cardElement.setAttribute('src', 'images/back.png');
        cardElement.setAttribute('data-id', randomIterator[i]);
        cardElement.addEventListener('click', flipCard);
        document.getElementById('game-board').appendChild(cardElement);
    }
}

function removeCards() {
    let imageNodes = document.querySelectorAll('[data-id]');
    for (let i = 0; i < imageNodes.length; i++) {
        imageNodes[i].remove();
    }
}

function removeModal() {
    modal.style.visibility = 'hidden';
    modal.classList.remove('matched');
    modal.classList.remove('mismatched');
    removeCards();
    createBoard();
}

function randomCards() {
    randomIterator.length = 0;
    const indices = [0, 1, 2, 3];
    while (indices.length > 0) {
        randomIterator.push(indices.splice(Math.floor(Math.random()*indices.length), 1)[0]);
    }
}

againButton.addEventListener('click', removeModal);
resetButton.addEventListener('click', function() {
    score = [0, 0];
    scoreMatch.textContent = score[0].toString();
    scoreMismatch.textContent = score[1].toString();
    if (modal.style.visibility === 'visible') {
        removeModal();
    } else {
        removeCards();
        createBoard();
    }
});
createBoard();


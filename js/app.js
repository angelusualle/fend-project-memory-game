//Initializing all global variables
'use strict';
let startTime;
let endTime;
let cards = [];
let activeCard;
let matches = 0;
let moves = 0;
let stars = 3;
let timer;

//Setting up event listeners
document.querySelector('.close').addEventListener('click', () => document.querySelector('#winner').style.display = 'none');
document.querySelector('#btnPlayAgain').addEventListener('click', () => window.location.reload());
document.querySelector('.restart').addEventListener('click', () => window.location.reload());

//Click event handler will perform all logic here including keeping track of score
document.querySelector('.deck').addEventListener('click', (clickCardEvent) => {
    if (clickCardEvent.target.nodeName == 'LI' && !clickCardEvent.target.classList.contains('open')) {
        if (startTime == undefined) {
            startGame();
        }
        openCard(clickCardEvent);
        if (!activeCard) {
            activeCard = clickCardEvent.target;
        }
        else {
            ++moves;
            if (moves % 8 == 0 && stars > 1) {
                --stars;
                const star = document.querySelector('.fa-star');
                star.classList.remove('fa-star');
                star.classList.add('fa-star-o');
            }
            document.querySelector('.score-panel span').innerText = moves;
            if (clickCardEvent.target.children[0].className == activeCard.children[0].className) {
                clickCardEvent.target.classList.add('match');
                activeCard.classList.add('match');
                ++matches;
                if (matches == 8) {
                    winner();
                }
                activeCard = undefined;
            }
            else {
                closeCard(activeCard);
                closeCard(clickCardEvent.target);
                let interval = setInterval(() => {
                    const listOfNotMatchedCards = document.querySelectorAll('.notMatch');
                    for (let i = 0; i < listOfNotMatchedCards.length; ++i) {
                        markAsUnMatched(listOfNotMatchedCards, i);
                    }
                    clearInterval(interval);
                }, 500);
                activeCard = undefined;
            }
        }
    }
});

//Initializing deck
createDeck();
Reset();
document.querySelector('.score-panel span').innerText = moves;

function Reset() {
    shuffle();
    updateHTML();
}

//Updates deck HTML using global variables
function updateHTML() {
    const HTMLDeck = document.querySelector('.deck');
    HTMLDeck.innerHTML = '';
    const docFrag = document.createDocumentFragment();
    cards.forEach(c => docFrag.appendChild(c));
    HTMLDeck.appendChild(docFrag);
}

//Creates deck saves in global variable
function createDeck() {
    cards = [];
    document.querySelector('.deck').innerHTML = '';
    for (let i = 0; i < 2; ++i) {
        cards.push(createCard('diamond'));
        cards.push(createCard('paper-plane-o'));
        cards.push(createCard('anchor'));
        cards.push(createCard('bolt'));
        cards.push(createCard('cube'));
        cards.push(createCard('leaf'));
        cards.push(createCard('bicycle'));
        cards.push(createCard('bomb'));
    }
}

//Returns HTML card given string type of card
function createCard(type) {
    const card = document.createElement('li');
    card.classList.add('card');
    const innerTag = document.createElement('i');
    innerTag.classList.add('fa', 'fa-' + type);
    card.appendChild(innerTag);
    return card;
}

// Shuffle function from http://stackoverflow.com/a/2450976 modified
function shuffle() {
    var currentIndex = cards.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = cards[currentIndex];
        cards[currentIndex] = cards[randomIndex];
        cards[randomIndex] = temporaryValue;
    }
}

//Given a list of cards will flip over to not be seen after unmatched animation
function markAsUnMatched(listOfNotMatchedCards, i) {
    listOfNotMatchedCards[i].classList.remove('open');
    listOfNotMatchedCards[i].classList.remove('show');
    listOfNotMatchedCards[i].classList.remove('notMatch');
}

//Starts the game by initializing startTime and setting timer for updating this span.
function startGame() {
    startTime = new Date();
    timer = setInterval(() => document.querySelector('.timer > span').innerText = Math.floor(((new Date()) - startTime) / (1000)), 1000);
}

//Handles winnning the game by initiating pop up also clears timer.
function winner() {
    endTime = new Date();
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('x', moves);
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('Y', stars);
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('Z', Math.floor((endTime - startTime) / (1000)));
    document.querySelector('#winner').style.display = 'block';
    clearInterval(timer);
}

//Opens card by adding necessary CSS classes
function openCard(clickCardEvent) {
    clickCardEvent.target.classList.add('open');
    clickCardEvent.target.classList.add('show');
}

//Closes card by adding necessary CSS class for animation.
function closeCard(card) {
    card.classList.add('notMatch');
}
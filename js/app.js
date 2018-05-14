/*
 * Create a list that holds all of your cards
 */
'use strict';
let startTime = new Date();
let endTime;
let cards = [];
let activeCard;
let matches = 0;
let moves = 0;
let stars = 3;

createDeck();
Reset();
document.querySelector('.score-panel span').innerText = moves;


function Reset() {
    shuffle();
    updateHTML();
}

function updateHTML() {
    const HTMLDeck = document.querySelector('.deck');
    HTMLDeck.innerHTML = '';
    const docFrag = document.createDocumentFragment();
    cards.forEach(c => docFrag.appendChild(c));
    HTMLDeck.appendChild(docFrag);
}

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


function createCard(type) {
    const card = document.createElement('li');
    card.classList.add('card');
    const innerTag = document.createElement('i');
    innerTag.classList.add('fa', 'fa-' + type);
    card.appendChild(innerTag);
    return card;
}

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 */

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


/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
document.querySelector('.deck').addEventListener('click', (clickCardEvent) => {
    if (clickCardEvent.target.nodeName == 'LI' && !clickCardEvent.target.classList.contains('open')) {
       
        open(clickCardEvent);
        if (!activeCard) {
            activeCard = clickCardEvent.target;
        }
        else {
            ++moves;
            if (moves % 8 == 0 && stars > 0) {
                --stars;

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
                close(activeCard);
                close(clickCardEvent.target);
                let interval = setInterval(() => {
                    const listOfNotMatchedCards = document.querySelectorAll('.notMatch');
                    for (let i = 0; i < listOfNotMatchedCards.length; ++i) {
                        listOfNotMatchedCards[i].classList.remove('open');
                        listOfNotMatchedCards[i].classList.remove('show');
                        listOfNotMatchedCards[i].classList.remove('notMatch');
                    }
                    clearInterval(interval);
                }, 500);
                activeCard = undefined;
            }
        }

    }

});

function winner() {
    endTime = new Date();
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('x', moves);
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('Y', stars);
    document.querySelector('.popup-content p').innerText = document.querySelector('.popup-content p').innerText.replace('Z', Math.floor((endTime - startTime) / (1000)));
    document.querySelector('#winner').style.display = 'block';
}

function open(clickCardEvent) {
    clickCardEvent.target.classList.add('open');
    clickCardEvent.target.classList.add('show');
}

function close(card) {
    card.classList.add('notMatch');
}

document.querySelector('.close').addEventListener('click', () => document.querySelector('#winner').style.display = 'none');
document.querySelector('#btnPlayAgain').addEventListener('click', () => window.location.reload());
document.querySelector('.restart').addEventListener('click', () => window.location.reload());

//testing start
document.querySelector('#test').addEventListener('click', () => winner());
//testing end
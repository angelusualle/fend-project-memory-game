/*
 * Create a list that holds all of your cards
 */
'use strict';
let cards = [];
let activeCard;
createDeck();
Reset();

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
    if (clickCardEvent.target.nodeName == 'LI') {
        open(clickCardEvent);
        if (!activeCard) {
            activeCard = clickCardEvent.target;
        }
        else {
            if (clickCardEvent.target.children[0].className == activeCard.children[0].className) {
                activeCard = undefined;
            }
            else {
                close(activeCard);
                close(clickCardEvent.target);
                activeCard = undefined;
            }
        }

    }

});

function open(clickCardEvent) {
    clickCardEvent.target.classList.add('open');
    clickCardEvent.target.classList.add('show');
}

function close(card) {
    card.classList.remove('open');
    card.classList.remove('show');
}

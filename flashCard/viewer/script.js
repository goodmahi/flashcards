let cards = [];
let currentIndex = 0;

const urlParams = new URLSearchParams(window.location.search);
const set = urlParams.get('set');
let csvFile = 'licensing.csv';
switch(set) {
    case '1': csvFile = 'licensing.csv'; break;
    case '2': csvFile = 'agency.csv'; break;
    case '3': csvFile = 'trust.csv'; break;
    case '4': csvFile = 'advertising.csv'; break;
    case '5': csvFile = 'disciplinary.csv'; break;
    case '6': csvFile = 'ohio-property.csv'; break;
    case '7': csvFile = 'section7.csv'; break;
    case '8': csvFile = 'section8.csv'; break;
    case '9': csvFile = 'section9.csv'; break;
    default: csvFile = 'licensing.csv';
}

async function loadCards() {
    try {
        const response = await fetch('../data/' + csvFile);
        const csvText = await response.text();
        const lines = csvText.trim().split('\n');
        const headers = lines[0].split(',');
        for (let i = 1; i < lines.length; i++) {
            const values = lines[i].split(',');
            if (values.length >= 2) {
                cards.push({
                    question: values[0].trim(),
                    answer: values[1].trim()
                });
            }
        }
        if (cards.length > 0) {
            displayCard();
            updateCounter();
        } else {
            document.getElementById('question').textContent = 'No cards found.';
            document.getElementById('answer').textContent = 'Please check your cards.csv file.';
        }
    } catch (error) {
        console.error('Error loading CSV:', error);
        document.getElementById('question').textContent = 'Error loading cards.';
        document.getElementById('answer').textContent = 'Please ensure cards.csv exists.';
    }
}

function displayCard() {
    const card = cards[currentIndex];
    document.getElementById('question').textContent = card.question;
    document.getElementById('answer').textContent = card.answer;
    document.getElementById('card').classList.remove('flipped');
}

function updateCounter() {
    document.getElementById('counter').textContent = `${currentIndex + 1} / ${cards.length}`;
}

document.getElementById('card').addEventListener('click', function() {
    this.classList.toggle('flipped');
});

document.getElementById('next').addEventListener('click', function() {
    if (currentIndex < cards.length - 1) {
        currentIndex++;
        displayCard();
        updateCounter();
    }
});

document.getElementById('prev').addEventListener('click', function() {
    if (currentIndex > 0) {
        currentIndex--;
        displayCard();
        updateCounter();
    }
});

// Keyboard controls
document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
        const card = document.getElementById('card');
        if (card.classList.contains('flipped')) {
            card.classList.remove('flipped');
            setTimeout(() => {
                if (event.key === 'ArrowLeft' && currentIndex > 0) {
                    currentIndex--;
                } else if (event.key === 'ArrowRight' && currentIndex < cards.length - 1) {
                    currentIndex++;
                }
                displayCard();
                updateCounter();
            }, 600);
        } else {
            if (event.key === 'ArrowLeft' && currentIndex > 0) {
                currentIndex--;
            } else if (event.key === 'ArrowRight' && currentIndex < cards.length - 1) {
                currentIndex++;
            }
            displayCard();
            updateCounter();
        }
    } else if (event.key === ' ') {
        event.preventDefault();
        document.getElementById('card').classList.toggle('flipped');
    }
});

// Load cards on page load
loadCards();
const cardsContainer = document.getElementById("cards-container");
const nextBtn = document.getElementById("btn-next");
const prevBtn = document.getElementById("btn-prev");
const addNewCardBtn = document.getElementById("btn-add-card");
const clearBtn = document.getElementById("btn-clear");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCard = document.getElementById("btn-add");
const closeBtn = document.getElementById("btn-close");
const btnFlip = document.getElementById('btn-flip');
const currentEl = document.getElementById('current');

// Current card
let currentActiveCard = 0;

// Cards DOM array
const cardsElements = [];

// Update current card number
const updateCurrentNumber = () => {
    currentEl.textContent = `${currentActiveCard + 1} / ${cardsElements.length}`;
}

// Cards Data
const cardsData = [{
        question: 'What is PHP?',
        answer: 'Programming language'
    },
    {
        question: 'What is a variable?',
        answer: 'Container for a piece of data'
    },
    {
        question: 'What is CSS?',
        answer: 'Cascading Style Sheets'
    },
];

// Create single card
const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // First card gets class active
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="card-front show" id="card-front">
        <p>${data.question}</p>
    </div>
    <div class="card-back" id="card-back">
        <p>${data.answer}</p>
    </div>
    `;

    // Flip to answer
    card.addEventListener('click', () => {
        card.classList.toggle('show-answer');
    })

    // Add to cards array
    cardsElements.push(card)

    cardsContainer.appendChild(card);

    updateCurrentNumber();
}

// Create cards
const createCards = () => {
    cardsData.forEach((data, index) => {
        createCard(data, index);
    })
}


createCards();
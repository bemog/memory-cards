const cardsContainer = document.getElementById("cards-container");
const nextBtn = document.getElementById("btn-next");
const prevBtn = document.getElementById("btn-prev");
const addNewCardBtn = document.getElementById("btn-add-card");
const clearBtn = document.getElementById("btn-clear");
const questionEl = document.getElementById("question");
const answerEl = document.getElementById("answer");
const addCard = document.getElementById("btn-add");
const closeBtn = document.getElementById("btn-close");
const currentEl = document.getElementById('current');
const addNewCardContainer = document.getElementById('new-screen');

// Current card
let currentActiveCard = 0;

// Cards DOM array
const cardsElements = [];

// Update current card number
const updateCurrentNumber = () => {
    currentEl.textContent = `${currentActiveCard + 1} / ${cardsElements.length}`;
}

// Get cards data from local storage
const getCardsData = () => {
    const cards = JSON.parse(localStorage.getItem('cards'));
    return cards === null ? [] : cards;
}

// Add cards data to local storage
const setCardsData = () => {
    localStorage.setItem('cards', JSON.stringify(cardsData));
    window.location.reload();
}

// Cards Data
const cardsData = getCardsData();

/*
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
*/

// Create single card
const createCard = (data, index) => {
    const card = document.createElement('div');
    card.classList.add('card');

    // First card gets class active
    if (index === 0) {
        card.classList.add('active');
    }

    card.innerHTML = `
    <div class="card-front" id="card-front">
        <p>${data.question}</p>
    </div>
    <div class="card-back" id="card-back">
        <p>${data.answer}</p>
    </div>
    `;

    // Flip to answer
    card.addEventListener('click', (e) => {
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

// Event listeners
nextBtn.addEventListener('click', () => {
    cardsElements[currentActiveCard].className = 'card';

    currentActiveCard += 1;

    if (currentActiveCard > cardsElements.length - 1) {
        currentActiveCard = cardsElements.length - 1;
    }
    cardsElements[currentActiveCard].className = 'card active';
    updateCurrentNumber();
});

prevBtn.addEventListener('click', () => {
    cardsElements[currentActiveCard].className = 'card';

    currentActiveCard -= 1;

    if (currentActiveCard < 0) {
        currentActiveCard = 0;
    }
    cardsElements[currentActiveCard].className = 'card active';
    updateCurrentNumber();
});

addNewCardBtn.addEventListener('click', () => {
    addNewCardContainer.classList.add('show');
})

closeBtn.addEventListener('click', (e) => {
    e.preventDefault();
    addNewCardContainer.classList.remove('show');
})

addCard.addEventListener('click', (e) => {
    e.preventDefault();

    const question = questionEl.value;
    const answer = answerEl.value;

    if (question && answer) {
        const newCard = {
            question,
            answer
        };
        createCards(newCard);

        // Clear inputs
        questionEl.value = "";
        answerEl.value = "";
        // Hide new card container
        addNewCardContainer.classList.remove('show');

        cardsData.push(newCard);
        setCardsData(cardsData);
    }
})

clearBtn.addEventListener('click', () => {
    localStorage.clear();
    cardsContainer.innerHTML = '';
    window.location.reload();
})
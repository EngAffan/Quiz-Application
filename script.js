const questions = [
    {
        question: "What does HTML stand for?",
        options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "Hyperlinking Text Management Language"],
        answer: 0
    },
    {
        question: "Which CSS property controls the text size?",
        options: ["font-size", "text-size", "font-style", "text-style"],
        answer: 0
    },
    {
        question: "Which HTML element is used for the largest heading?",
        options: ["<h1>", "<h6>", "<heading>", "<head>"],
        answer: 0
    },
    {
        question: "Which property is used to change the background color?",
        options: ["background-color", "color", "bgcolor", "background"],
        answer: 0
    },
    {
        question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?",
        options: ["alt", "src", "title", "longdesc"],
        answer: 0
    }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function startQuiz() {
    document.getElementById('welcome-screen').style.display = 'none';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

function loadQuestion() {
    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const resultElement = document.getElementById('result');
    
    resultElement.style.display = 'none';
    answerSelected = false;

    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;

    optionsElement.innerHTML = '';
    let shuffledOptions = currentQuestion.options.map((option, index) => ({option, index}));
    shuffledOptions = shuffle(shuffledOptions);

    shuffledOptions.forEach(({option, index}) => {
        const optionButton = document.createElement('button');
        optionButton.innerText = option;
        optionButton.onclick = () => checkAnswer(index, optionButton);
        optionsElement.appendChild(optionButton);
    });
}

function checkAnswer(selectedOptionIndex, selectedButton) {
    const resultElement = document.getElementById('result');
    const currentQuestion = questions[currentQuestionIndex];

    const optionsElement = document.getElementById('options');
    const buttons = optionsElement.getElementsByTagName('button');

    Array.from(buttons).forEach((button) => {
        button.disabled = true;
    });

    if (selectedOptionIndex === currentQuestion.answer) {
        selectedButton.classList.add('correct');
        resultElement.innerText = 'Correct!';
        score++;
    } else {
        selectedButton.classList.add('wrong');
        resultElement.innerText = 'Wrong!';
    }
    resultElement.style.display = 'block';
    answerSelected = true;
}

function nextQuestion() {
    if (!answerSelected) {
        alert('Please select an option before moving to the next question.');
        return;
    }

    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
    } else {
        showScore();
    }
}

function showScore() {
    const quizElement = document.getElementById('quiz');
    const scoreElement = document.getElementById('score');
    const resultElement = document.getElementById('result');
    const retryButton = document.getElementById('retryButton');
    
    quizElement.style.display = 'none';
    resultElement.style.display = 'block';
    resultElement.innerText = 'Results';
    scoreElement.innerText = `Your score is ${score} out of ${questions.length}`;
    retryButton.style.display = 'block';
}

function restartQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    answerSelected = false;
    document.getElementById('retryButton').style.display = 'none';
    document.getElementById('score').innerText = '';
    document.getElementById('quiz').style.display = 'block';
    loadQuestion();
}

loadQuestion();
var startButton = document.getElementById('start-btn');
var questionContainer = document.getElementById('quiz-container');
var questionElement = document.getElementById('question');
var answersElement = document.getElementById('answers');
var timerElement = document.getElementById('timer');
var finalScoreElement = document.getElementById('final-score');
var saveScoreButton = document.getElementById('save-score');

var questions = [
    {
        question: 'Javascript is an _______ language.',
        answers: ['Object-Oriented', 'Procedural', 'Object-based', 'Functional'],
        correctIndex: 0
    },

    {
        question: 'Upon encountering empty statements, JavaScript _________.',
        answers: ['Throws an error', 'Prompts to complete the statement', 'Ignores the statements', 'Halts the execution of the program'],
        correctIndex: 2
    },

    {
        question: 'How can a datatybe be declared to be a constant type?',
        answers: ['const', 'var', 'let', 'constant'],
        correctIndex: 0
    },
    {
        question: 'Which of the following is not a valid JavaScript variable name?',
        answers: ['2names', '_first_and_last_names', 'FirstAndLast', 'None of the above'],
        correctIndex: 0
    }
];



// timer
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;

startButton.addEventListener('click', startGame);

function startGame() {
    startButton.style.display = 'none';
    questionContainer.style.display = 'block';
    startTimer();
    showQuestion();
}

function showQuestion() {
    var question = questions[currentQuestionIndex];
    questionElement.textContent = question.question;
    answersElement.innerHTML = '';
    question.answers.forEach((answer, index) => {
        var button = document.createElement('button');
        button.textContent = answer;
        button.addEventListener('click', () => selectAnswer(index));
        answersElement.appendChild(button);
    });
}

// Subtract time for incorrect answer
function selectAnswer(index) {

    if (index === questions[currentQuestionIndex].correctIndex) {
        score++;

    } else {
        timeLeft -= 10;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length && timeLeft > 0) {
        showQuestion();
    } else {
        endGame();
    }
}

function startTimer() {
    timerElement.textContent = timeLeft + ' seconds left';
    var timerInterval = setInterval(() => {
        timeLeft--;
        timerElement.textContent = timeLeft + ' seconds left';
        if (timeLeft <= 0 || currentQuestionIndex >= questions.length)  {
            clearInterval(timerInterval);
            endGame();
        }
    }, 1000);
}



function endGame() {
    timerElement.textContent = 'Game over';
    questionContainer.style.display = 'none';
    finalScoreElement.style.display = 'block';
    var scoreDisplay = document.getElementById('score-display');
    scoreDisplay.textContent = `Your final score is: ${score}`;
    console.log('Final Score', score);
}

saveScoreButton.addEventListener('click', () => {
    var initials = document.getElementById('initials').value;
    var highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push({ initials, score });
    localStorage.setItem('highScores', JSON.stringify(highScores));
    console.log('Initials', initials);
});
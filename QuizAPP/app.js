const questions = [
    {
        topic: 'Computer Language',
        question: 'What is the best language for programming?',
        possibleAnswer: ['Python', 'JavaScript', 'C++'],
        correctAnswer: 'Python',
    },
    {
        topic: 'Software',
        question: 'What is the best OS for cybersecurity?',
        possibleAnswer: ['MacOS', 'Linux', 'Windows'],
        correctAnswer: 'Linux',
    },
    {
        topic: 'Hardware',
        question: 'Who has the best Hardware',
        possibleAnswer: ['Apple', 'Invidia', 'Amd'],
        correctAnswer: 'Amd',
    },
    {
        topic: 'Teacher',
        question: 'Who is your Teacher?',
        possibleAnswer: ['Cornelius', 'Edith', 'Rajiv'],
        correctAnswer: 'Cornelius',
    },
    {
        topic: 'Facaulty',
        question: 'How many Facaulty does ISBAT have?',
        possibleAnswer: ['4', '12', '24'],
        correctAnswer: '4',
    },
    {
        topic: 'URL',
        question: 'what does URL stand for?',
        possibleAnswer: ['Unique Resorce Locator', 'Uniform Resorce Locator', 'User Response Log'],
        correctAnswer: 'Uniform Resorce Locator',
    },
];

const quizProgress = document.getElementById('Quiz-Progress');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = 0;
let score = 0;

function showQuestion(index) {
    const q = questions[index];
    questionContainer.textContent = q.question;
    answerContainer.innerHTML = '';
    q.possibleAnswer.forEach(ans => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => handleAnswer(ans, btn);
        answerContainer.appendChild(btn);
    });
    // Update progress bar
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
}

function handleAnswer(selected, btn) {
    const q = questions[currentQuestion];
    if (selected === q.correctAnswer) {
        score++;
        nextQuestion();
    } else {
        shakeElement(btn);
    }
}

function shakeElement(element) {
    element.classList.add('shake');
    setTimeout(() => {
        element.classList.remove('shake');
    }, 500);
}

function showCorrectAnswers() {
    const answerListContainer = document.getElementById('answer-list-container');
    answerListContainer.style.display = 'block';
    answerListContainer.innerHTML = '<h3>Correct Answers:</h3>';
    const ul = document.createElement('ul');
    questions.forEach(q => {
        const li = document.createElement('li');
        li.textContent = `${q.question} — ${q.correctAnswer}`;
        ul.appendChild(li);
    });
    answerListContainer.appendChild(ul);
}

function showScore() {
    const percent = Math.round((score / questions.length) * 100);
    const scoreDiv = document.createElement('div');
    scoreDiv.style.fontSize = '1.3rem';
    scoreDiv.style.fontWeight = 'bold';
    scoreDiv.style.margin = '16px 0';
    scoreDiv.textContent = `You scored ${percent}% (${score} out of ${questions.length})`;
    questionContainer.appendChild(scoreDiv);
}

function showRestartPrompt() {
    const restartDiv = document.createElement('div');
    restartDiv.style.marginTop = '24px';
    const restartBtn = document.createElement('button');
    restartBtn.textContent = 'Retake Quiz';
    restartBtn.style.fontSize = '1rem';
    restartBtn.style.padding = '10px 24px';
    restartBtn.style.borderRadius = '8px';
    restartBtn.onclick = restartQuiz;
    restartDiv.appendChild(restartBtn);
    questionContainer.appendChild(restartDiv);
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        questionContainer.textContent = 'Quiz Complete!';
        answerContainer.innerHTML = '';
        progressBar.style.width = '100%';
        showScore();
        showCorrectAnswers();
        showRestartPrompt();
    }
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    document.getElementById('answer-list-container').style.display = 'none';
    showQuestion(currentQuestion);
}

// Add shake animation CSS
const style = document.createElement('style');
style.textContent = `
.shake {
    animation: shake 0.5s;
}
@keyframes shake {
    0% { transform: translateX(0); }
    20% { transform: translateX(-8px); }
    40% { transform: translateX(8px); }
    60% { transform: translateX(-8px); }
    80% { transform: translateX(8px); }
    100% { transform: translateX(0); }
}
`;
document.head.appendChild(style);

showQuestion(currentQuestion);
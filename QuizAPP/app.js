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
    }
];

const quizProgress = document.getElementById('Quiz-Progress');
const questionContainer = document.getElementById('question-container');
const answerContainer = document.getElementById('answer-container');
const progressBar = document.getElementById('progress-bar');

let currentQuestion = 0;

function showQuestion(index) {
    const q = questions[index];
    questionContainer.textContent = q.question;
    answerContainer.innerHTML = '';
    q.possibleAnswer.forEach(ans => {
        const btn = document.createElement('button');
        btn.textContent = ans;
        btn.onclick = () => nextQuestion(ans);
        answerContainer.appendChild(btn);
    });
    // Update progress bar
    const progress = ((index + 1) / questions.length) * 100;
    progressBar.style.width = progress + '%';
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

function nextQuestion(selected) {
    currentQuestion++;
    if (currentQuestion < questions.length) {
        showQuestion(currentQuestion);
    } else {
        questionContainer.textContent = 'Quiz Complete!';
        answerContainer.innerHTML = '';
        progressBar.style.width = '100%';
        showCorrectAnswers();
    }
}

showQuestion(currentQuestion);
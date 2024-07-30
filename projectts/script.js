const questions = [
    {
        question: "What is 2 + 2?",
        answers: [
            { text: "3", correct: false },
            { text: "4", correct: true },
            { text: "5", correct: false },
            { text: "6", correct: false }
        ],
        background: "#ffcccc"
    },
    {
        question: "What is 5 * 3?",
        answers: [
            { text: "15", correct: true },
            { text: "10", correct: false },
            { text: "20", correct: false },
            { text: "25", correct: false }
        ],
        background: "#ccffcc"
    },
    {
        question: "What is 12 / 4?",
        answers: [
            { text: "2", correct: false },
            { text: "3", correct: true },
            { text: "4", correct: false },
            { text: "6", correct: false }
        ],
        background: "#ccccff"
    },
    {
        question: "What is 7 + 8?",
        answers: [
            { text: "14", correct: false },
            { text: "15", correct: true },
            { text: "16", correct: false },
            { text: "18", correct: false }
        ],
        background: "#ffffcc"
    }
];

let currentQuestionIndex = 0;
let timer;
let timeLeft = 5;

const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const timerElement = document.getElementById("time");

function startQuiz() {
    console.log("Quiz started");
    currentQuestionIndex = 0;
    nextButton.classList.add("hide");
    timeLeft = 5;
    showQuestion(questions[currentQuestionIndex]);
    startTimer();
}

function showQuestion(question) {
    console.log("Showing question:", question.question);
    questionElement.innerText = question.question;
    answerButtonsElement.innerHTML = "";
    question.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerText = answer.text;
        button.classList.add("answer-btn");
        if (answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
        answerButtonsElement.appendChild(button);
    });
    document.body.style.backgroundColor = question.background;
    resetTimer();
}

function selectAnswer(e) {
    clearInterval(timer);
    const selectedButton = e.target;
    const correct = selectedButton.dataset.correct === "true";
    console.log("Answer selected:", selectedButton.innerText, "Correct:", correct);
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct === "true");
    });
    if (questions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove("hide");
    } else {
        nextButton.innerText = "Restart";
        nextButton.classList.remove("hide");
    }
}

function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add("correct");
    } else {
        element.classList.add("wrong");
    }
}

function clearStatusClass(element) {
    element.classList.remove("correct");
    element.classList.remove("wrong");
}

function startTimer() {
    timer = setInterval(() => {
        timeLeft--;
        timerElement.innerText = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timer);
            moveToNextQuestion();
        }
    }, 1000);
}

function resetTimer() {
    clearInterval(timer);
    timeLeft = 5;
    timerElement.innerText = timeLeft;
    startTimer();
}

function moveToNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
        nextButton.classList.add("hide");
    } else {
        startQuiz();
    }
}

nextButton.addEventListener("click", moveToNextQuestion);

startQuiz();

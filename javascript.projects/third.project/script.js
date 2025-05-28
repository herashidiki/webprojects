// dom element

const startScreen = document.querySelector("#start-screen")
const quizScreen = document.querySelector("#quiz-screen")
const resultScreen = document.querySelector("#result-screen")
const startButton = document.querySelector("#start-btn")
const questionText = document.querySelector("#question-text")
const answersContainer = document.querySelector("#answers-container")
const currentQuestionSpan = document.querySelector("#current-question")
const totalQuestionsSpan = document.querySelector("#total-questions")
const scorespan = document.querySelector("#score")
const finalscorespan = document.querySelector("#final-score")
const maxScoreSpan = document.querySelector("#max-score")
const resultMessage = document.querySelector("#result-message")
const restartButton = document.querySelector("#restart-btn")
const progressbar = document.querySelector("#progress")




const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


//quiz 
let currentquestionIndex =0;
let score = 0;
let answerdisabled = false

totalQuestionsSpan.textContent = quizQuestions.length;
maxScoreSpan.textContent =quizQuestions.length

startButton.addEventListener('click',startquiz);
restartButton.addEventListener('click',restart);



function startquiz(){
  currentquestionIndex = 0;
  score =0;
  scorespan.textContent = 0;

  startScreen.classList.remove("active");
  quizScreen.classList.add("active");
  showquestion();
}


function showquestion(){
  answerdisabled = false
  const currentouestion = quizQuestions[currentquestionIndex]

  currentQuestionSpan.textContent = currentquestionIndex + 1
  const progressPeresent = (currentquestionIndex / quizQuestions.length) * 100;
  progressbar.style.width = progressPeresent + "%"
  questionText.textContent = currentouestion.question


  answersContainer.innerHTML ="";

currentouestion.answers.forEach(answer =>{
  const button = document.createElement("button")
  button.textContent = answer.text
  button.classList.add("answer-btn")




  button.dataset.correct= answer.correct

  button.addEventListener("click",selectanswer)

  answersContainer.appendChild(button)
})
}

function selectanswer(event){
  if(answerdisabled) return

  answerdisabled = true
  const selectbutton = event.target;
  const iscorrect  = selectbutton.dataset .correct === "true"
   Array.from(answersContainer.children).forEach((button) =>{
  if(button.dataset.correct === "true"){
    button.classList.add("correct");
  }else{
    button.classList.add("incorrect");
  }
   });
  if(iscorrect){
    score ++;
    scorespan.textContent = score
  }

  setTimeout(()=>{
 currentquestionIndex++;
 if(currentquestionIndex < quizQuestions.length){
  showquestion();
 }else{
showresult()
 }
  },1000)

}

function showresult(){
  quizScreen.classList.remove("active");
  resultScreen.classList.add("active")

  finalscorespan.textContent = score;

  const precentage = (score/quizQuestions.length)*100
  if(precentage ===100){
    resultMessage.textContent = "you are genius";
  }else if(precentage >= 80){
    resultMessage.textContent = "great job you know your stuff"
  }else if(precentage >= 60){
    resultMessage.textContent = "good effort! keep learning"
  }else if(precentage >= 40){
    resultMessage.textContent = "not bad try again to improve"
  }else{
    resultMessage.textContent ="keep studying you will get better"
  }

}


function restart(){
  resultScreen.classList.remove("active");
  startquiz();
}


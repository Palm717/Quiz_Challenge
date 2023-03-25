// Get HTML elements
var startButton = document.getElementById("start");
var questionText = document.getElementById("questions");
var answerButtons = document.getElementById("answers");
var timerElement = document.getElementById("timer");
var highScoreLink = document.getElementById("storage");

// Set quiz variables
var currentQuestion = 0;
var score = 0;
var timeLeft = 60;
var timerInterval;

// Start the quiz when the start button is clicked
startButton.addEventListener("click", startQuiz);

function startQuiz() {
  // Hide start button
  startButton.style.display = "none";

  // Display first question
  displayQuestion();

  // Start the timer
  timerInterval = setInterval(function () {
    timeLeft--;
    timerElement.textContent = "Timer: " + timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      endQuiz();
    }
  }, 1000);

  // End the quiz when it is complete
  if (currentQuestion >= quizQAndA.length) {
    endQuiz();
  }
}

// Display the current question and answer choices
function displayQuestion() {
  // Clear previous answer buttons
  answerButtons.innerHTML = "";

  // Display question text
  questionText.textContent = quizQAndA[currentQuestion].question;

  // Create answer buttons
  quizQAndA[currentQuestion].answer.forEach(function (answer) {
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", checkAnswer);
    answerButtons.appendChild(button);
  });
}

// Check if the user selected the correct answer
function checkAnswer(event) {
  var selectedAnswer = event.target.textContent;
  var correctAnswer = quizQAndA[currentQuestion].correct;

  if (selectedAnswer === correctAnswer) {
    score += 10;
    timeLeft += 10;
  } else {
    timeLeft -= 10;
  }

  // Move to the next question or end the quiz
  if (currentQuestion >= quizQAndA.length) {
    endQuiz();
  } else {
    currentQuestion++;
    displayQuestion();
  }
}

// End the quiz and show the score
function endQuiz() {
  clearInterval(timerInterval);
  timerElement.textContent = "Timer: 0";

  // Hide question and answer elements
  questionText.style.display = "none";
  answerButtons.style.display = "none";

  // Display final score
  var scoreText = document.createElement("p");
  scoreText.textContent = "Your final score is " + score;
  document.body.appendChild(scoreText);
}

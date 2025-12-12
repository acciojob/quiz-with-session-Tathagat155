

// Display the quiz questions and choices
// Render all questions + choices
// ----------------------------
// QUESTIONS ARRAY (given)
// ----------------------------
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars", "Saturn"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// ----------------------------
// DOM ELEMENTS
// ----------------------------
const questionsElement = document.getElementById("questions");
const submitBtn = document.getElementById("submit");
const scoreBox = document.getElementById("score");

// ----------------------------
// LOAD SAVED PROGRESS
// ----------------------------
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};


// ----------------------------
// RENDER QUESTIONS FUNCTION
// ----------------------------
function renderQuestions() {
  questionsElement.innerHTML = "";

  for (let i = 0; i < questions.length; i++) {
    const q = questions[i];

    const questionDiv = document.createElement("div");

    // Question Text
    const questionText = document.createElement("h3");
    questionText.textContent = q.question;
    questionDiv.appendChild(questionText);

    // Render choices
    for (let j = 0; j < q.choices.length; j++) {
      const choice = q.choices[j];

      const wrapper = document.createElement("div");

      const choiceElement = document.createElement("input");
      choiceElement.type = "radio";
      choiceElement.name = `question-${i}`;
      choiceElement.value = choice;

      // Restore saved selection
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }
		const textNode = document.createTextNode(choice);

      wrapper.appendChild(choiceElement);
      wrapper.appendChild(textNode);
		questionDiv.appendChild(wrapper);

      // When user selects, save to sessionStorage
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });
    }

    questionsElement.appendChild(questionDiv);
  }
}

// Render questions on load
renderQuestions();


// ----------------------------
// SUBMIT QUIZ
// ----------------------------
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Show score
  scoreBox.textContent = `Your score is ${score} out of 5.`;

  // Save score in localStorage
  localStorage.setItem("score", score);
});


// ----------------------------
// SHOW SCORE IF ALREADY STORED
// ----------------------------
const savedScore = localStorage.getItem("score");
if (savedScore !== null) {
  scoreBox.textContent = `Your score is ${savedScore} out of 5.`;
}

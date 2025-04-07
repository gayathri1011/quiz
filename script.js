const questions = [
    {
      question: "Which tree is known as the ‘Tree of Life’ in the desert?",
      answers: [
        { text: "Date Palm", correct: true },
        { text: "Baobab", correct: false },
        { text: "Acacia", correct: false },
        { text: "Cedar", correct: false }
      ]
    },
    {
      question: "What percentage of the Earth's surface is covered by forests?",
      answers: [
        { text: "10%", correct: false },
        { text: "31%", correct: true },
        { text: "50%", correct: false },
        { text: "75%", correct: false }
      ]
    },
    {
      question: "Which process in nature helps regulate atmospheric CO2?",
      answers: [
        { text: "Erosion", correct: false },
        { text: "Photosynthesis", correct: true },
        { text: "Respiration", correct: false },
        { text: "Condensation", correct: false }
      ]
    }
  ];
  
  const questionElement = document.getElementById('question');
  const answerButtons = document.getElementById('answer-buttons');
  const nextButton = document.getElementById('next-btn');
  
  let currentQuestionIndex = 0;
  let score = 0;
  
  function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
  }
  
  function showQuestion() {
    resetState();
    const currentQuestion = questions[currentQuestionIndex];
    questionElement.innerText = currentQuestion.question;
  
    currentQuestion.answers.forEach(answer => {
      const button = document.createElement('button');
      button.innerText = answer.text;
      button.classList.add('btn');
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener('click', selectAnswer);
      answerButtons.appendChild(button);
    });
  }
  
  function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
      answerButtons.removeChild(answerButtons.firstChild);
    }
  }
  
  function selectAnswer(e) {
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect) {
      selectedBtn.style.backgroundColor = 'green';
      score++;
    } else {
      selectedBtn.style.backgroundColor = 'darkred';
    }
    Array.from(answerButtons.children).forEach(btn => {
      btn.disabled = true;
      if (btn.dataset.correct === "true") {
        btn.style.backgroundColor = 'green';
      }
    });
    nextButton.style.display = 'block';
  }
  
  function showScore() {
    resetState();
    questionElement.innerText = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerText = 'Play Again';
    nextButton.style.display = 'block';
  }
  
  nextButton.addEventListener('click', () => {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      showQuestion();
    } else {
      showScore();
    }
  });
  
  startQuiz();
  
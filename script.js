const questions = [
  {
    question: "من هو اللاعب الذي سجل أسرع ثلاثية في الدوري الإنجليزي ؟",
    options: ["محمد صلاح", "ستيفن جيرارد", "ايرلينج هالاند", "ساديو ماني"],
    answer: "ساديو ماني",
  },
  {
    question:
      "أسرع هدف تم تسجيله في تاريخ الدوري الإنجليزي جاء في 7.69 ثانية. من سجلها؟",
    options: ["لويس سواريز", "كريستيانو رونالدو", "هو شين لونج", "محمد صلاح"],
    answer: "هو شين لونج",
  },
  {
    question: "ما هي الدولة التي فازت بأول كأس عالم على الإطلاق عام 1930؟",
    options: ["البرازيل", "اورجواي", "اسبانيا", "فرنسا"],
    answer: "اورجواي",
  },
  {
    question: "ما هي الدولة التي فازت بأكبر عدد من بطولات كأس العالم؟",
    options: ["البرازيل", "الأرجنتين", "ايطاليا", "المانيا"],
    answer: "البرازيل",
  },
  {
    question: "الرقم القياسي لأهداف المونديال هو 16 من سجلها ؟",
    options: [
      "ليونيل ميسي",
      "ميروسلاف كلوزه",
      "كريستيانو رونالدو",
      "كيليان مبابي",
    ],
    answer: "ميروسلاف كلوزه",
  },
  {
    question: "من هو اللاعب الوحيد الذي فاز بدوري الأبطال بثلاثة أندية مختلفة؟",
    options: ["كريستيانو رونالدو", "داني الفيش", "رونالدينهو", "سيدورف"],
    answer: "سيدورف",
  },
  {
    question: "من هو أفضل هداف في دوري أبطال أوروبا على الإطلاق؟",
    options: ["معزه", "بنزيما", "ليفاندوفسكي", "كريستيانو رونالدو"],
    answer: "كريستيانو رونالدو",
  },
  {
    question: "ما هو الفريق الذي تغلب عليه بورتو في نهائي الأبطال 2004",
    options: ["بايرن ميونخ", "موناكو", "برشلونه", "ارسنال"],
    answer: "موناكو",
  },
  {
    question:
      "هناك بلد لعبت ثلاث نهائيات بكأس العالم ولكن لم يفز بأي منهم على الإطلاق، فمن تكون هذه البلد؟",
    options: ["البرتغال", "كرواتيا", "هولندا", "كولومبيا"],
    answer: "هولندا",
  },
  {
    question: "في اي فريق يتواجد افضل لاعب في الاردن-موسى التعمري",
    options: ["مونبيليه", "ليون", "مارسيليا", "باريس"],
    answer: "مونبيليه",
  },
  {
    question: "ما هو افضل فريق بالاردن الرجاء التركيز بالسؤال",
    options: ["الجزيره", "الرمثا", "الوحدات", "الفيصلي"],
    answer: "الفيصلي",
  },
];

let currentQuestion = 0;
let score = 0;
const totalQuestions = questions.length;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const resultsElement = document.getElementById("results");
const counterElement = document.getElementById("counter");
const messageElement = document.getElementById("message");
let timer;

function displayQuestion() {
  if (currentQuestion >= questions.length) {
    showResults();
    return;
  }

  const question = questions[currentQuestion];

  // Display the question
  questionElement.textContent = question.question;

  // Clear previous options and display new ones
  optionsElement.innerHTML = "";
  question.options.forEach((option) => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionElement.addEventListener("click", () => {
      checkAnswer(option);
    });
    optionsElement.appendChild(optionElement);
  });

  // Update the results display
  updateResults();

  // Start the timer
  startTimer();
}

function startTimer() {
  let timeLeft = 30; // 30 seconds
  counterElement.textContent = `Time : ${timeLeft}`;

  timer = setInterval(() => {
    timeLeft--;
    counterElement.textContent = `Time : ${timeLeft}`;

    if (timeLeft === 0) {
      clearInterval(timer);
      checkAnswer(null); // Move to the next question when time runs out
    }
  }, 1000);
}

function checkAnswer(selectedOption) {
  clearInterval(timer); // Stop the timer when an answer is selected

  const correctAnswer = questions[currentQuestion].answer;

  // Get all option elements
  const optionElements = optionsElement.querySelectorAll(".option");

  // Immediately apply styling based on correctness
  optionElements.forEach((optionElement) => {
    if (optionElement.textContent === selectedOption) {
      if (selectedOption === correctAnswer) {
        optionElement.classList.add("correct");
        score++;
      } else {
        optionElement.classList.add("incorrect");
      }
    } else if (optionElement.textContent === correctAnswer) {
      optionElement.classList.add("correct");
    }
  });

  // Wait for a short delay before moving to the next question
  setTimeout(() => {
    currentQuestion++;
    displayQuestion();
  }, 1000); // Delay for 1 second
}

function showResults() {
  // Display the custom message
  messageElement.textContent = `Your score is ${score} of ${totalQuestions}`;
  messageElement.style.display = "block";
}

function updateResults() {
  resultsElement.textContent = `Score: ${score} // ${totalQuestions}`;
}

// Start the quiz
displayQuestion();
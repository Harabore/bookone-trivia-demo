const quizData = [
  { q: "Premier League season 2025-2026 season?", a: ["Arsenal", "Machester United", "", "Chelsea", ], correct: 0 },
  { q: "What year was Raila Odinga born??", a: ["55", "40", "50", "45"], correct: 1 },
  { q: "Capital city of Kenya?", a: ["Nakuru", "Nairobi", "Mombasa", "Kisumu"], correct: 1 },
  { q: "Who is known as the father of computers?", a: ["Bill Gates", "Charles Babbage", "Alan Turing", "Elon Musk"], correct: 1 },
  { q: "Which is the longest river in the world?", a: ["Amazon", "Nile", "Yangtze", "Congo"], correct: 1 },
  { q: "Who painted the Mona Lisa?", a: ["Van Gogh", "Da Vinci", "Picasso", "Rembrandt"], correct: 1 },
  { q: "Which year did Kenya gain independence?", a: ["1960", "1963", "1970", "1958"], correct: 1 },
  { q: "Largest planet in our solar system?", a: ["Mars", "Jupiter", "Saturn", "Earth"], correct: 1 },
  { q: "Fastest land animal?", a: ["Lion", "Cheetah", "Leopard", "Gazelle"], correct: 1 },
  { q: "Who discovered penicillin?", a: ["Einstein", "Fleming", "Newton", "Curie"], correct: 1 },
  { q: "Which Kenyan athlete won the 2018 Berlin Marathon?", a: ["Rudisha", "Kipchoge", "Kamworor", "Kiprop"], correct: 1 }
];

let current = 0;
let score = 0;

const container = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const leaderboard = document.getElementById("leaderboard");
const rewards = document.getElementById("rewards");

nextBtn.addEventListener("click", nextQuestion);

function nextQuestion() {
  if (current === 0) nextBtn.innerText = "Next";
  if (current < quizData.length) {
    renderQuestion();
  } else {
    showResults();
  }
}

function renderQuestion() {
  const q = quizData[current];
  container.innerHTML = `
    <h2>Question ${current + 1}</h2>
    <p>${q.q}</p>
    ${q.a.map((option, i) => `
      <button class="btn option" data-index="${i}">${option}</button>
    `).join("")}
  `;
  document.querySelectorAll(".option").forEach(btn => {
    btn.addEventListener("click", (e) => {
      const selected = parseInt(e.target.dataset.index);
      if (selected === q.correct) score += 10;
      current++;
      if (current < quizData.length) nextQuestion();
      else showResults();
    });
  });
}

function showResults() {
  container.innerHTML = `<h2>Quiz Complete!</h2>
    <p>You scored <strong>${score}</strong> out of ${quizData.length * 10}</p>`;
  nextBtn.style.display = "none";
  leaderboard.classList.remove("hidden");
  rewards.classList.remove("hidden");

  const leaderboardData = [
    { name: "Jane Doe", score: 90 },
    { name: "John Mwangi", score: 80 },
    { name: "Faith Achieng", score: 70 },
    { name: "Ali Hussein", score: 60 },
    { name: "You", score: score }
  ];
  leaderboardData.sort((a, b) => b.score - a.score);
  document.getElementById("leaderboard-list").innerHTML =
    leaderboardData.map(p => `<li>${p.name} — ${p.score} pts</li>`).join("");
}

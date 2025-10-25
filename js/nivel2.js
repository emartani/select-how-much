const items = [
  { name: "popcorn (large)", price: "$8", img: "img/popcorn_large.png" },
  { name: "soda (medium)", price: "$3", img: "img/soda_medium.png" },
  { name: "ice cream", price: "$6", img: "img/icecream.png" },
  { name: "hot dog", price: "$10", img: "img/hotdog.png" },
  { name: "candies", price: "$3", img: "img/candies.png" }
];

const translations = {
  "popcorn (large)": "a pipoca grande",
  "soda (medium)": "o refrigerante médio",
  "ice cream": "o sorvete",
  "hot dog": "o cachorro-quente",
  "candies": "os doces"
};

const container = document.getElementById("options");
const response = document.getElementById("response");
const question = document.getElementById("question");
const startButton = document.getElementById("startButton");
const soundCorrect = document.getElementById("soundCorrect");
const soundWrong = document.getElementById("soundWrong");

let currentRound = 0;
const maxRounds = 5;
let targetPrice = "";
let questionPrices = [];

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function speakQuestion(price) {
  const voices = speechSynthesis.getVoices();
  const englishVoice = voices.find(v => v.name === "Microsoft Zira") || voices.find(v => v.lang === "en-US");
  const portugueseVoice = voices.find(v => v.lang === "pt-BR");

  const utterEn = new SpeechSynthesisUtterance(`Which item costs ${price}?`);
  utterEn.voice = englishVoice;
  utterEn.lang = 'en-US';

  const utterPt = new SpeechSynthesisUtterance(`Qual item custa ${price}?`);
  utterPt.voice = portugueseVoice;
  utterPt.lang = 'pt-BR';

  speechSynthesis.cancel();
  speechSynthesis.speak(utterEn);
  speechSynthesis.speak(utterPt);
}

function nextQuestion() {
  if (currentRound >= questionPrices.length) {
    question.textContent = "🎉 Game over! You finished all questions.";
    startButton.style.display = "inline-block";
    return;
  }

  targetPrice = questionPrices[currentRound];
  question.textContent = `Which item costs ${targetPrice}?`;
  response.textContent = "";
  speakQuestion(targetPrice);
  currentRound++;
}

items.forEach(item => {
  const div = document.createElement("div");
  div.className = "option";
  div.innerHTML = `<img src="${item.img}" alt="${item.name}">`;
  div.onclick = () => {
   const translatedName = translations[item.name] || item.name;
   if (item.price === targetPrice) {
    response.textContent = `✅ Correct! ${translatedName} custa ${item.price}.`;
    soundCorrect.currentTime = 0;
    soundCorrect.play();
   } else {
    response.textContent = `❌ Incorrect. ${translatedName} custa ${item.price}, não ${targetPrice}.`;
    soundWrong.currentTime = 0;
    soundWrong.play();
   }
   setTimeout(nextQuestion, 5000);
};
  container.appendChild(div);
});

// ✅ Inicia o jogo após clique
startButton.onclick = () => {
  startButton.style.display = "none";
  currentRound = 0;

  // Gera lista de preços únicos e embaralha
  const uniquePrices = [...new Set(items.map(item => item.price))];
  questionPrices = shuffleArray(uniquePrices).slice(0, maxRounds);

  nextQuestion();
};

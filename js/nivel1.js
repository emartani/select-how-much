const items = [
  { name: "popcorn (large)", price: "$8", img: "img/popcorn_large.png" },
  { name: "popcorn (medium)", price: "$4", img: "img/popcorn_medium.png" },
  { name: "popcorn (small)", price: "$3", img: "img/popcorn_small.png" },
  { name: "soda (large)", price: "$5", img: "img/soda_large.png" },
  { name: "soda (medium)", price: "$3", img: "img/soda_medium.png" },
  { name: "soda (small)", price: "$2", img: "img/soda_small.png" },
  { name: "candies", price: "$3", img: "img/candies.png" },
  { name: "hot dog", price: "$10", img: "img/hotdog.png" },
  { name: "ice cream", price: "$6", img: "img/icecream.png" }
];

const translations = {
  "popcorn (large)": "a pipoca grande",
  "popcorn (medium)": "a pipoca média",
  "popcorn (small)": "a pipoca pequena",
  "soda (large)": "o refrigerante grande",
  "soda (medium)": "o refrigerante médio",
  "soda (small)": "o refrigerante pequeno",
  "candies": "os doces",
  "hot dog": "o cachorro-quente",
  "ice cream": "o sorvete"
};

const container = document.getElementById("options");
const response = document.getElementById("response");
let currentRound = 0;
const maxRounds = 5;

// Função para traduzir nome para português
function translateNameToPortuguese(name) {
  return name
    .replace("small", "pequeno")
    .replace("medium", "médio")
    .replace("large", "grande")
    .replace("popcorn", "pipoca")
    .replace("soda", "refrigerante")
    .replace("candies", "doces")
    .replace("hot dog", "cachorro-quente")
    .replace("ice cream", "sorvete");
}

// Função para falar em inglês e português
function speakDualLanguage(englishText, portugueseText) {
  const voices = speechSynthesis.getVoices();

  const englishVoice = voices.find(v => v.name === "Microsoft Zira") || voices.find(v => v.lang === "en-US");
  const portugueseVoice = voices.find(v => v.lang === "pt-BR");

  const utterEn = new SpeechSynthesisUtterance(englishText);
  utterEn.voice = englishVoice;
  utterEn.lang = 'en-US';

  const utterPt = new SpeechSynthesisUtterance(portugueseText);
  utterPt.voice = portugueseVoice;
  utterPt.lang = 'pt-BR';

  speechSynthesis.cancel();
  speechSynthesis.speak(utterEn);
  speechSynthesis.speak(utterPt);
}

// Criação dos cards
items.forEach(item => {
  const div = document.createElement("div");
  div.className = "option";
  div.innerHTML = `<img src="${item.img}" alt="${item.name}"><p>${item.name}</p>`;
  div.onclick = () => {
    const phraseEn = `How much is the ${item.name}? It’s ${item.price}.`;
    const translatedName = translations[item.name] || item.name;
    const phrasePt = `Quanto custa ${translatedName}? É ${item.price}.`;
    response.textContent = phraseEn + " / " + phrasePt;
    speakDualLanguage(phraseEn, phrasePt);
    
    currentRound++;
    if (currentRound >= maxRounds) {
     response.textContent += " 🎉 Nível 1 completo!";
     setTimeout(() => {
      window.location.href = "nivel2.html";
     }, 3000); // espera 3 segundos antes de ir para o nível 2
    }
  };
  container.appendChild(div);
});

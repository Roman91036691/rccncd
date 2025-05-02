const coin = document.getElementById('coin');
const scoreDisplay = document.getElementById('score');
const clickSound = document.getElementById('click-sound');
const gameScreen = document.getElementById('game-screen');
const shopScreen = document.getElementById('shop-screen');
const gameBtn = document.getElementById('game-btn');
const shopBtn = document.getElementById('shop-btn');

let score = parseInt(localStorage.getItem('raccoonScore')) || 0;
scoreDisplay.textContent = score;

coin.addEventListener('click', () => {
  score++;
  localStorage.setItem('raccoonScore', score);
  scoreDisplay.textContent = score;

  // Пружинна анімація
  coin.style.transform = 'scale(0.85)';
  setTimeout(() => {
    coin.style.transform = 'scale(1)';
  }, 150);

  // Звук
  clickSound.currentTime = 0;
  clickSound.play();
  
}

    
);

// Перемикання між екранами
gameBtn.addEventListener('click', () => {
  gameScreen.classList.remove('hidden');
  shopScreen.classList.add('hidden');
});

shopBtn.addEventListener('click', () => {
  shopScreen.classList.remove('hidden');
  gameScreen.classList.add('hidden');
});

const energyDisplay = document.getElementById('energy');

const MAX_ENERGY = 3000;
const REGEN_INTERVAL = 3000; // 3 секунди
const FULL_REGEN_TIME = 24 * 60 * 60 * 1000;

let energyData = JSON.parse(localStorage.getItem('raccoonEnergy')) || {
  value: MAX_ENERGY,
  lastUpdate: Date.now()
};

// Відновлення енергії залежно від часу
function regenEnergy() {
  const now = Date.now();
  const elapsed = now - energyData.lastUpdate;

  if (elapsed >= FULL_REGEN_TIME) {
    energyData.value = MAX_ENERGY;
  } else {
    const unitsToAdd = Math.floor(elapsed / REGEN_INTERVAL);
    if (unitsToAdd > 0) {
      energyData.value = Math.min(MAX_ENERGY, energyData.value + unitsToAdd);
      energyData.lastUpdate += unitsToAdd * REGEN_INTERVAL;
    }
  }

  updateEnergyDisplay();
  localStorage.setItem('raccoonEnergy', JSON.stringify(energyData));
}

// Оновлення енергії кожні 3 секунди
setInterval(() => {
  regenEnergy();
}, REGEN_INTERVAL);

// Клік по монеті з витратою енергії
coin.addEventListener('click', () => {
  if (energyData.value <= 0) return;

  energyData.value--;
  energyData.lastUpdate = Date.now();
  localStorage.setItem('raccoonEnergy', JSON.stringify(energyData));
  updateEnergyDisplay();

  score++;
  localStorage.setItem('raccoonScore', score);
  updateScoreDisplay();

  coin.style.transform = 'scale(0.85)';
  setTimeout(() => coin.style.transform = 'scale(1)', 150);

  if (!clickSound.paused) {
    clickSound.pause();
    clickSound.currentTime = 0;
  }
  clickSound.play().catch(() => {});
});

function updateEnergyDisplay() {
  energyDisplay.textContent = `🔋 ${energyData.value} / ${MAX_ENERGY}`;
}

// Перший запуск
regenEnergy();

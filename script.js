let score = 0;
let clickPower = 1;
let energy = 3000;
const maxEnergy = 3000;

const scoreEl = document.getElementById('score');
const coin = document.getElementById('coin');
const energyEl = document.getElementById('energy');

// Завантаження збережень
if (localStorage.getItem('raccoonScore')) {
  score = parseInt(localStorage.getItem('raccoonScore'));
}
if (localStorage.getItem('clickPower')) {
  clickPower = parseInt(localStorage.getItem('clickPower'));
}
if (localStorage.getItem('raccoonEnergy')) {
  energy = parseInt(localStorage.getItem('raccoonEnergy'));
}

scoreEl.textContent = score;
updateEnergyDisplay();

// Клік по монеті
coin.addEventListener('click', () => {
  if (energy > 0) {
    score += clickPower;
    energy -= 1;
    scoreEl.textContent = score;
    updateEnergyDisplay();
    localStorage.setItem('raccoonScore', score);
    localStorage.setItem('raccoonEnergy', energy);
  } else {
    showMessage("Немає енергії ⚡");
  }
});

// Енергія відновлюється кожні 3 секунди
setInterval(() => {
  if (energy < maxEnergy) {
    energy += 1;
    updateEnergyDisplay();
    localStorage.setItem('raccoonEnergy', energy);
  }
}, 3000);

// Оновлення виводу енергії
function updateEnergyDisplay() {
  energyEl.textContent = `${energy} / ${maxEnergy} 🔋`;
}

// Покупка Click Power
const buyBtn = document.getElementById('buy-click-power');
buyBtn.addEventListener('click', () => {
  if (score >= 300) {
    score -= 300;
    clickPower += 1;
    scoreEl.textContent = score;
    localStorage.setItem('raccoonScore', score);
    localStorage.setItem('clickPower', clickPower);
    showMessage("+1 до сили кліку!");
  } else {
    showMessage("Недостатньо монет 🪙");
  }
});

// Повідомлення
function showMessage(text) {
  const msg = document.createElement('div');
  msg.textContent = text;
  msg.style.position = 'fixed';
  msg.style.top = '50%';
  msg.style.left = '50%';
  msg.style.transform = 'translate(-50%, -50%)';
  msg.style.color = 'white';
  msg.style.fontSize = '28px';
  msg.style.background = 'rgba(0,0,0,0.7)';
  msg.style.padding = '16px 24px';
  msg.style.borderRadius = '12px';
  msg.style.zIndex = 9999;
  document.body.appendChild(msg);
  setTimeout(() => msg.remove(), 2000);
}

// Перемикання сторінок
const gameScreen = document.getElementById('game-screen');
const shopScreen = document.getElementById('shop-screen');
const btnGame = document.getElementById('btn-game');
const btnShop = document.getElementById('btn-shop');

btnGame.addEventListener('click', () => {
  gameScreen.classList.add('active');
  shopScreen.classList.remove('active');
  btnGame.classList.add('active');
  btnShop.classList.remove('active');
});

btnShop.addEventListener('click', () => {
  shopScreen.classList.add('active');
  gameScreen.classList.remove('active');
  btnShop.classList.add('active');
  btnGame.classList.remove('active');
});

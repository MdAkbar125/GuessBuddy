const MAX_LEVEL = 10;

let secret;
let attempts;
let level = 1;
let min = 1;
let max = 50;

const message = document.getElementById('message');
const attemptsEl = document.getElementById('attempts');
const levelEl = document.getElementById('level');
const historyEl = document.getElementById('history');
const input = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const hintBtn = document.getElementById('hintBtn');
const restartBtn = document.getElementById('restartBtn');

function initGame() {
  if (level <= 3) {
    min = 1; max = 50;
  } else if (level <= 6) {
    min = 1; max = 100;
  } else {
    min = 1; max = 200;
  }

  secret = Math.floor(Math.random() * (max - min + 1)) + min;
  attempts = 8;

  attemptsEl.textContent = attempts;
  levelEl.textContent = level;
  message.textContent = `Guess a number between ${min} and ${max}.`;
  historyEl.innerHTML = "";

  input.disabled = false;
  guessBtn.disabled = false;
}

function log(text) {
  const div = document.createElement('div');
  div.className = 'history-item';
  div.textContent = text;
  historyEl.prepend(div);
}

guessBtn.onclick = () => {
  const val = Number(input.value);

  if (!val || val < min || val > max) {
    message.textContent = `Please enter a number between ${min} and ${max}.`;
    return;
  }

  attempts--;
  attemptsEl.textContent = attempts;

  if (val === secret) {
    message.textContent = `🎉 Congratulations! ${val} is correct!`;
    log(`✔ Correct: ${val}`);

    input.disabled = true;
    guessBtn.disabled = true;
    level++;

    if (level > MAX_LEVEL) {
      setTimeout(() => {
        message.textContent = "🏆 You completed all 10 levels! Well done!";
        log("🏆 Game Completed");
      }, 1000);
      return;
    }

    setTimeout(() => {
      initGame();
    }, 1500);

  } else {
    message.textContent = val < secret ? "Too low! Try again." : "Too high! Try again.";
    log(`Tried ${val}`);
  }

  if (attempts === 0 && val !== secret) {
    message.textContent = `❌ Game Over! The number was ${secret}`;
    log("❌ Game Over");
    input.disabled = true;
    guessBtn.disabled = true;
  }

  input.value = "";
};

hintBtn.onclick = () => {
  if (attempts <= 1) {
    message.textContent = "Not enough attempts for a hint.";
    return;
  }

  attempts--;
  attemptsEl.textContent = attempts;

  message.textContent =
    secret % 2 === 0
      ? "🔍 Hint: The number is EVEN."
      : "🔍 Hint: The number is ODD.";
};
restartBtn.onclick = () => {
  level = 1;
  initGame();
};
const toggle = document.getElementById('themeToggle');

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  toggle.textContent = theme === 'light' ? '🌙 Dark' : '☀️ Light';
}

toggle.onclick = () => {
  const current = document.documentElement.getAttribute('data-theme');
  setTheme(current === 'light' ? 'dark' : 'light');
};

setTheme(localStorage.getItem('theme') || 'dark');

initGame();

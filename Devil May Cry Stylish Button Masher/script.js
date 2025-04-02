const keys = ["W", "A", "S", "D", "J", "K", "L", "I", "O", "P"];
const ranks = ["Dull", "Crazy", "Blast", "Awesome", "Stylish", "SSS"];
let score = 0;
let combo = 0;
let currentKey = "";
let timer = 100;
let gameActive = true;
let speed = 3000;
let difficultyIncreaseInterval;

const scoreElement = document.getElementById("score");
const comboElement = document.getElementById("combo");
const rankElement = document.getElementById("rank");
const targetKeyElement = document.getElementById("target-key");
const timerBar = document.getElementById("timer-bar");

function getRandomKey() {
    return keys[Math.floor(Math.random() * keys.length)]; 
}

function updateRank () {
    if (combo >= 30) {
        rankElement.textContent = ranks[5];
        rankElement.style.color = "#ff00ff";
        rankElement.style.textShadow = "0 0 15px #ff00ff";
    } else if (combo >= 20) {
        rankElement.textContent = ranks[4];
        rankElement.style.color = "#ffcc00";
        rankElement.style.textShadow = "0 0 15px #ffcc00";
    
    } else if (combo >= 15) {
        rankElement.textContent = ranks[3];
        rankElement.style.color = "#00ff00";
        rankElement.style.textShadow = "0 0 10px #00ff00";
    
    } else if (combo >= 10) {
        rankElement.textContent = ranks[2];
        rankElement.style.color = "#0099ff";
        rankElement.style.textShadow = "0 0 8px #0099ff";
    
    } else if (combo >= 5) {
        rankElement.textContent = ranks[1];
        rankElement.style.color = "#ff3300";
        rankElement.style.textShadow = "0 0 5px #ff3300";
    
    } else {
        rankElement.textContent = ranks[0];
        rankElement.style.color = "#aaa";
        rankElement.style.textShadow = "none";
    }
   
}

function updateTimer () {
    if (!gameActive) return;

    timer -=1;
    timerBar.style.width = `${timer}%`;

    if (timer <= 0) {
        gameActive = false;
        setTimeout (() => {
            alert(`Игра окончена! Ваш счёт: ${score}\nМаксимальный ранг: ${rankElement.textContent}`);
            resetGame();
        }, 500);
    }
}

function increaseDifficulty() {
    speed = Math.max(200, speed - 50);
    clearInterval(keyInterval);
    keyInterval = setInterval(nextKey, speed);
}


function resetGame() {
    score = 0;
    combo = 0;
    timer = 100;
    gameActive = true;
    speed = 3000;
    scoreElement.textContent = "0";
    comboElement.textContent = "0";
    rankElement.textContent = "Dull";
    rankElement.style.color = "#aaa";
    rankElement.style.textShadow = "none";
    timerBar.style.width = "100%";
    clearInterval(difficultyIncreaseInterval);
    nextKey();
    keyInterval = setInterval(nextKey, speed);
    difficultyIncreaseInterval = setInterval(increaseDifficulty, 5000);
}

function nextKey() {
    if (!gameActive) return;
    currentKey = getRandomKey();
    targetKeyElement.textContent = currentKey;
    targetKeyElement.classList.add("key-animate");
    setTimeout(() => {
        targetKeyElement.classList.remove("key-animate");
    }, 300);
}

document.addEventListener("keydown", (e) => {
    console.log(e);
    if (!gameActive) return;

    const pressedKey = e.key.toUpperCase();

    if (keys.includes(pressedKey)) {
        if (pressedKey === currentKey) {
            score += 10;
            combo += 1;
            scoreElement.textContent = score;
            comboElement.textContent = combo;
            updateRank();
            nextKey();
            timer = Math.min(timer + 5, 100);
        } else {
            combo = 0;
            comboElement.textContent = "0";
            updateRank();
            timer = Math.max(timer - 10, 0);
        }
    }
});

let keyInterval = setInterval(nextKey, speed);
difficultyIncreaseInterval = setInterval(increaseDifficulty, 5000);
setInterval(updateTimer, 100);
nextKey();
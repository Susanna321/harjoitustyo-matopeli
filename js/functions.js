const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const gridSize = 20; // Matopelin ruudun koko
let snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
let direction = { x: 20, y: 0 }; // Madon alkusuunta
let food = { x: 100, y: 100 }; // Ruoan sijainti
let score = 0;
let gameLoopInterval;

function drawSnake() {
    snake.forEach(part => {
        ctx.fillStyle = "green";
        ctx.fillRect(part.x, part.y, gridSize, gridSize);
    });
}

function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    if (newHead.x === food.x && newHead.y === food.y) {
        score += 1;
        document.getElementById("score").textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    snake.unshift(newHead);
    if (checkCollision()) {
        endGame();
    }
}

function placeFood() {
    food.x = Math.floor(Math.random() * (canvas.width / gridSize)) * gridSize;
    food.y = Math.floor(Math.random() * (canvas.height / gridSize)) * gridSize;
}

function drawFood() {
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function checkCollision() {
    const head = snake[0];

    // Tarkista törmäys seinään
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        return true;
    }

    // Tarkista törmäys omaan kehoon
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }

    return false;
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    moveSnake();
    drawSnake();
    drawFood();
}

function endGame() {
    clearInterval(gameLoopInterval);
    alert("Peli ohi! Pisteesi: " + score);
    saveScore(score);
}

function saveScore(score) {
    let highScores = JSON.parse(localStorage.getItem("highScores")) || [];
    highScores.push(score);
    localStorage.setItem("highScores", JSON.stringify(highScores));
}

function restartGame() {
    snake = [{ x: 160, y: 160 }, { x: 140, y: 160 }, { x: 120, y: 160 }];
    direction = { x: 20, y: 0 };
    score = 0;
    document.getElementById("score").textContent = score;
    placeFood();
    gameLoopInterval = setInterval(gameLoop, 100);
}

window.addEventListener("keydown", function (event) {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) {
                direction = { x: 0, y: -20 };
            }
            break;
        case "ArrowDown":
            if (direction.y === 0) {
                direction = { x: 0, y: 20 };
            }
            break;
        case "ArrowLeft":
            if (direction.x === 0) {
                direction = { x: -20, y: 0 };
            }
            break;
        case "ArrowRight":
            if (direction.x === 0) {
                direction = { x: 20, y: 0 };
            }
            break;
    }
});

restartGame(); 

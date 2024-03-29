const canvas = document.getElementById('game-board');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const scoreDisplay = document.getElementById('score');

let snake = [];
let food = {};
let direction = '';
let score = 0;
let gameOver = false;
let gameLoop;

// Inicializar el juego
function init() {
    canvas.width = 400;
    canvas.height = 400;
    snake = [
        { x: 200, y: 200 },
        { x: 190, y: 200 },
        { x: 180, y: 200 },
        { x: 170, y: 200 },
        { x: 160, y: 200 }
    ];
    placeFood();
    direction = 'right';
    score = 0;
    gameOver = false;
    scoreDisplay.textContent = score;
    drawGame();
}

// Dibujar el juego
function drawGame() {
    clearCanvas();
    drawSnake();
    drawFood();
    if (!gameOver) {
        moveSnake();
        gameLoop = setTimeout(drawGame, 100);
    } else {
        displayGameOver();
    }
}

// Limpiar el canvas
function clearCanvas() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Dibujar la serpiente
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#0f0';
        ctx.fillRect(segment.x, segment.y, 10, 10);
    });
}

// Dibujar la comida
function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, 10, 10);
}

// Mover la serpiente
function moveSnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y -= 10;
            break;
        case 'down':
            head.y += 10;
            break;
        case 'left':
            head.x -= 10;
            break;
        case 'right':
            head.x += 10;
            break;
    }

    snake.unshift(head);

    if (snake[0].x === food.x && snake[0].y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    if (
        snake[0].x < 0 ||
        snake[0].x >= canvas.width ||
        snake[0].y < 0 ||
        snake[0].y >= canvas.height ||
        snake.slice(1).some(segment => segment.x === snake[0].x && segment.y === snake[0].y)
    ) {
        gameOver = true;
    }
}

// Colocar la comida en una posición aleatoria
function placeFood() {
    const x = Math.floor(Math.random() * ((canvas.width - 10) / 10)) * 10;
    const y = Math.floor(Math.random() * ((canvas.height - 10) / 10)) * 10;
    food = { x, y };
}

// Mostrar el mensaje de "Game Over"
function displayGameOver() {
    ctx.fillStyle = '#0f0';
    ctx.font = '48px Orbitron';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2);
}

// Controles del juego
document.addEventListener('keydown', (e) => {
    const key = e.key.replace('Arrow', '').toLowerCase();
    if (['up', 'down', 'left', 'right'].includes(key) && key !== direction) {
        direction = key;
    }
});

startBtn.addEventListener('click', () => {
    init();
});
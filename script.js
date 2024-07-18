// Get the canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
const gridSize = 20;
let snake = [{x: 200, y: 200}];
let food = {x: 0, y: 0};
let dx = gridSize;
let dy = 0;

// Main game loop
function gameLoop() {
    clearCanvas();
    moveSnake();
    drawSnake();
    drawFood();
    checkCollision();

    setTimeout(gameLoop, 100);
}

// Clear the canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
    const head = {x: snake[0].x + dx, y: snake[0].y + dy};
    snake.unshift(head);

    // Check if snake eats the food
    if (head.x === food.x && head.y === food.y) {
        generateFood();
    } else {
        snake.pop();
    }
}

// Draw the snake
function drawSnake() {
    snake.forEach(segment => {
        ctx.fillStyle = '#006600';
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeStyle = '#fff';
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });
}

// Generate new food position
function generateFood() {
    food.x = Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
    food.y = Math.floor(Math.random() * canvas.height / gridSize) * gridSize;
}

// Draw the food
function drawFood() {
    ctx.fillStyle = '#990000';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

// Check collision with walls or itself
function checkCollision() {
    if (snake[0].x < 0 || snake[0].x >= canvas.width || snake[0].y < 0 || snake[0].y >= canvas.height) {
        resetGame();
    }

    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            resetGame();
        }
    }
}

// Reset the game
function resetGame() {
    alert('Game Over! Press OK to restart.');
    snake = [{x: 200, y: 200}];
    dx = gridSize;
    dy = 0;
    generateFood();
}

// Handle keyboard input
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -gridSize;
    } else if (e.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = gridSize;
    } else if (e.key === 'ArrowLeft' && dx === 0) {
        dx = -gridSize;
        dy = 0;
    } else if (e.key === 'ArrowRight' && dx === 0) {
        dx = gridSize;
        dy = 0;
    }
});

// Start the game loop
generateFood();
gameLoop();

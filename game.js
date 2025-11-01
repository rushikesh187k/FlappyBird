
let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");

let bird = { x: 50, y: 200, width: 30, height: 25, velocity: 0 };
let gravity = 0.5;
let jump = -8;

let pipes = [];
let score = 0;
let gameOver = false;

function reset() {
    bird.y = 200;
    bird.velocity = 0;
    pipes = [];
    score = 0;
    gameOver = false;
}

function createPipe() {
    let gap = 120;
    let topHeight = Math.floor(Math.random() * 200) + 20;
    pipes.push({
        x: canvas.width,
        top: topHeight,
        bottom: canvas.height - topHeight - gap,
    });
}

setInterval(createPipe, 2000);

function update() {
    if (gameOver) return;

    bird.velocity += gravity;
    bird.y += bird.velocity;

    if (bird.y > canvas.height - bird.height || bird.y < 0) {
        gameOver = true;
    }

    pipes.forEach(p => {
        p.x -= 2;

        if (p.x < -40) {
            pipes.shift();
            score++;
        }

        if (
            bird.x + bird.width > p.x && bird.x < p.x + 40 &&
            (bird.y < p.top || bird.y + bird.height > canvas.height - p.bottom)
        ) {
            gameOver = true;
        }
    });
}

function draw() {
    ctx.fillStyle = "#70c5ce";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#ffdd00"; // Bird color
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    ctx.fillStyle = "#32a852"; // Pipe color
    pipes.forEach(p => {
        ctx.fillRect(p.x, 0, 40, p.top);
        ctx.fillRect(p.x, canvas.height - p.bottom, 40, p.bottom);
    });

    ctx.fillStyle = "#fff";
    ctx.font = "24px Arial";
    ctx.fillText("Score: " + score, 10, 30);

    if (gameOver) {
        ctx.fillStyle = "red";
        ctx.font = "32px Arial";
        ctx.fillText("Game Over!", 70, 200);
        ctx.fillText("Tap to Restart", 60, 250);
    }
}

function loop() {
    update();
    draw();
    requestAnimationFrame(loop);
}
loop();

// Controls
document.addEventListener("touchstart", function () {
    if (gameOver) reset();
    bird.velocity = jump;
});
document.addEventListener("mousedown", function () {
    if (gameOver) reset();
    bird.velocity = jump;
});

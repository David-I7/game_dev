"use strict";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
let CANVAS_WIDTH = (canvas.width = window.innerWidth);
let CANVAS_HEIGHT = (canvas.height = window.innerHeight);
const collsionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collsionCanvas.getContext("2d");
let COLLISION_CANVAS_WIDTH = (collsionCanvas.width = window.innerWidth);
let COLLISION_CANVAS_HEIGHT = (collsionCanvas.height = window.innerHeight);
let score = 0;
let gameOver = false;
class Raven {
    x = canvas.width;
    srcWidth;
    srcHeight;
    destWidth;
    destHeight;
    y;
    directionX = Math.random() * 3 + 1;
    directionY = Math.random() * 5 - 2.5;
    sizeModifier;
    isAnimationComplete = false;
    image;
    frame = 0;
    maxFrame = 6;
    timeSinceFlap = 0;
    flapInterval = Math.random() * 50 + 50;
    randomColors;
    color;
    hasTrail = false;
    constructor() {
        this.image = new Image();
        this.image.src = "assets/images/raven.png";
        this.sizeModifier = Math.random() * 0.6 + 0.2;
        this.srcWidth = this.image.width / 6;
        this.srcHeight = this.image.height;
        this.destWidth = this.srcWidth * this.sizeModifier;
        this.destHeight = this.srcHeight * this.sizeModifier;
        this.y = Math.random() * (canvas.height - this.destHeight);
        this.randomColors = [
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
            Math.floor(Math.random() * 255),
        ];
        this.color = `rgb(${this.randomColors[0]},${this.randomColors[1]},${this.randomColors[2]})`;
        this.hasTrail = Math.random() > 0.5;
    }
    update(delta) {
        this.x -= this.directionX;
        this.y += this.directionY;
        this.timeSinceFlap += delta;
        if (this.y <= 0 || this.y + this.destWidth > CANVAS_HEIGHT)
            this.directionY *= -1;
        if (this.x + this.destWidth < 0)
            this.isAnimationComplete = true;
        if (this.timeSinceFlap > this.flapInterval) {
            this.frame = (this.frame + 1) % this.maxFrame;
            this.timeSinceFlap = 0;
            if (this.hasTrail) {
                for (let i = 0; i < 5; ++i) {
                    particles.push(new Particle(this.x, this.y, this.destWidth, this.color));
                }
            }
        }
        if (this.x + this.destWidth < 0)
            gameOver = true;
    }
    draw() {
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.destWidth, this.destHeight);
        ctx.drawImage(this.image, this.frame * this.srcWidth, 0, this.srcWidth, this.srcHeight, this.x, this.y, this.destWidth, this.destHeight);
    }
}
class Explosion {
    x;
    y;
    size;
    image;
    srcWidth;
    srcHeight;
    frame = 0;
    maxFrame = 5;
    sound;
    timeSinceLastPlay = 0;
    frameInterval = 100;
    isAnimationComplete = false;
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.image = new Image();
        this.image.src = "assets/images/boom.png";
        this.srcWidth = this.image.width / this.maxFrame;
        this.srcHeight = this.image.height;
        this.sound = new Audio("assets/audio/Fire impact 1.wav");
    }
    update(delta) {
        if (this.frame == 0)
            this.sound.play();
        this.timeSinceLastPlay += delta;
        if (this.timeSinceLastPlay > this.frameInterval) {
            this.frame++;
            if (this.frame >= this.maxFrame)
                this.isAnimationComplete = true;
            this.timeSinceLastPlay = 0;
        }
    }
    draw() {
        ctx.drawImage(this.image, this.frame * this.srcWidth, 0, this.srcWidth, this.srcHeight, this.x, this.y, this.size, this.size);
    }
}
class Particle {
    x;
    y;
    size;
    color;
    radius;
    maxRadius = Math.random() * 20 + 35;
    isAnimationComplete = false;
    speedX = Math.random() * 1 + 0.5;
    constructor(x, y, size, color) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.x = x + size / 2 + Math.random() * 50 - 25;
        this.y = y + size / 3;
        this.radius = (Math.random() * size) / 10;
    }
    update() {
        this.x += this.speedX;
        this.radius += 0.5;
        if (this.radius > this.maxRadius)
            this.isAnimationComplete = true;
    }
    draw() {
        ctx.globalAlpha = Math.max(0, 1 - this.radius / this.maxRadius);
        ctx.beginPath();
        ctx.fillStyle = this.color;
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}
let ravens = [];
let explosions = [];
let particles = [];
let timeToNextRaven = 0;
let ravenInterval = 500; // 500ms
let lastTime = 0;
function drawScore() {
    ctx.font = "50px Impact";
    ctx.fillStyle = "Black";
    ctx.fillText(`Score: ${score}`, 52, 77);
    ctx.fillStyle = "White";
    ctx.fillText(`Score: ${score}`, 50, 75);
}
function drawGameOver() {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "magenta";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.font = "50px Impact";
    ctx.fillStyle = "Black";
    ctx.textAlign = "center";
    ctx.fillText(`GAME OVER, your score is: ${score}`, CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2);
    ctx.fillStyle = "white";
    ctx.fillText(`GAME OVER, your score is: ${score}`, CANVAS_WIDTH / 2 + 2, CANVAS_HEIGHT / 2 + 2);
}
window.addEventListener("click", (e) => {
    const imageData = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = imageData.data;
    ravens.forEach((object) => {
        if (object.randomColors[0] == pc[0] &&
            object.randomColors[1] == pc[1] &&
            object.randomColors[2] == pc[2]) {
            object.isAnimationComplete = true;
            score++;
            explosions.push(new Explosion(object.x, object.y, object.destWidth));
        }
    });
});
function animate(timestamp) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "magenta";
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    collisionCtx.clearRect(0, 0, COLLISION_CANVAS_WIDTH, COLLISION_CANVAS_HEIGHT);
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven += delta;
    if (timeToNextRaven > ravenInterval) {
        const raven = new Raven();
        ravens.push(raven);
        timeToNextRaven = 0;
        ravens.sort((a, b) => a.destWidth - b.destWidth);
    }
    drawScore();
    [...particles, ...ravens, ...explosions].forEach((object) => {
        object.update(delta);
    });
    [...particles, ...ravens, ...explosions].forEach((object) => {
        object.draw();
    });
    ravens = ravens.filter((object) => !object.isAnimationComplete);
    explosions = explosions.filter((object) => !object.isAnimationComplete);
    particles = particles.filter((object) => !object.isAnimationComplete);
    if (!gameOver)
        requestAnimationFrame(animate);
    else
        drawGameOver();
}
animate(0);

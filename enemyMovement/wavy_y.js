const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);
let GAME_FRAME = 0;
class Enemy {
    constructor(image) {
        this.image = image;
        this.x = 0;
        this.y = 0;
        this.sourceWidth = 0;
        this.sourceHeight = 0;
        this.destWidth = 0;
        this.destHeight = 0;
        this.speed = Math.random() * 3 + 0.5;
        this.frame = 0;
        this.flapSpeed = Math.floor(Math.random() * 3 + 1);
        this.angle = 0; //Math.random() * 2;
        this.angleSpeed = Math.random() * 0.2 + 0.01;
        this.amplitude = Math.random() * 6 + 1;
        this.sourceWidth = Math.floor(image.width / 6);
        this.sourceHeight = image.height;
        let scale = Math.random() * 2 + 2;
        this.destWidth = this.sourceWidth / scale;
        this.destHeight = this.sourceHeight / scale;
        this.x = Math.random() * (CANVAS_WIDTH - this.destWidth);
        this.y = Math.random() * (CANVAS_HEIGHT - this.destHeight);
    }
    update(delta) {
        this.x -= this.speed * delta;
        if (this.x + this.destWidth < 0)
            this.x = CANVAS_WIDTH;
        this.y += this.amplitude * Math.sin(this.angle) * delta;
        this.angle += this.angleSpeed;
        // animate frames
        this.frame = Math.floor(GAME_FRAME / this.flapSpeed) % 6;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frame * this.sourceWidth, 0, this.sourceWidth, this.sourceHeight, this.x, this.y, this.destWidth, this.destHeight);
    }
}
const numberOfEnemies = 10;
const enemies = [];
for (let i = 0; i < numberOfEnemies; ++i) {
    const img = new Image();
    img.src = "./public/enemy2.png";
    enemies.push(new Enemy(img));
}
function animate(delta) {
    GAME_FRAME++;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    enemies.forEach((enemy) => {
        enemy.draw(ctx);
        enemy.update(delta);
    });
}
window.addEventListener("load", () => {
    let lastTime = 0;
    const fps = 60;
    const frameDuration = 1000 / fps; // ~16.67ms
    function loop(timestamp) {
        const delta = timestamp - lastTime;
        if (delta >= frameDuration) {
            animate(delta / frameDuration);
            lastTime = timestamp;
        }
        requestAnimationFrame(loop);
    }
    loop(0);
});
export {};

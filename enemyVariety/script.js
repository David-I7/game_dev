"use strict";
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = (canvas.width = window.innerWidth);
    const CANVAS_HEIGHT = (canvas.height = window.innerHeight);
    class Enemy {
        image;
        markedForDeletion = false;
        x = 0;
        y = 0;
        srcWidth = 0;
        srcHeight = 0;
        destWidth = 0;
        destHeight = 0;
        frame = 0;
        maxFrames = 0;
        vx = 0;
        vy = 0;
        frameTimer = 0;
        frameInterval = 100;
        constructor(image) {
            this.image = image;
        }
        update(delta) {
            if (this.x + this.destWidth < 0) {
                this.markedForDeletion = true;
            }
            this.x -= this.vx * delta;
            this.frameTimer += delta;
            if (this.frameTimer > this.frameInterval) {
                this.frame = (this.frame + 1) % this.maxFrames;
                this.frameTimer -= this.frameInterval;
            }
        }
        draw(ctx) {
            ctx.drawImage(this.image, this.frame * this.srcWidth, 0, this.srcWidth, this.srcHeight, this.x, this.y, this.destWidth, this.destHeight);
        }
    }
    class Worm extends Enemy {
        constructor(canvasWidth, canvasHeight) {
            super(document.getElementById("worm"));
            this.maxFrames = 6;
            this.srcWidth = this.image.width / this.maxFrames;
            this.srcHeight = this.image.height;
            this.destWidth = this.srcWidth / 2;
            this.destHeight = this.srcHeight / 2;
            this.x = canvasWidth;
            this.y = canvasHeight - this.destHeight;
            this.vx = Math.random() * 0.1 + 0.1;
        }
    }
    class Spider extends Enemy {
        maxLen = 0;
        constructor(canvasWidth, canvasHeight) {
            super(document.getElementById("spider"));
            this.maxFrames = 6;
            this.srcWidth = this.image.width / this.maxFrames;
            this.srcHeight = this.image.height;
            this.destWidth = this.srcWidth / 2;
            this.destHeight = this.srcHeight / 2;
            this.x = Math.random() * (canvasWidth - this.destWidth);
            this.y = 0 - this.destHeight;
            this.vx = 0;
            this.vy = Math.random() * 0.1 + 0.1;
            this.maxLen = Math.random() * (canvasHeight - this.destHeight);
        }
        update(delta) {
            super.update(delta);
            this.y += this.vy * delta;
            if (this.y < 0 - this.destHeight * 2)
                this.markedForDeletion = true;
            if (this.y > this.maxLen) {
                this.vy *= -1;
            }
        }
        draw(ctx) {
            ctx.beginPath();
            ctx.moveTo(this.x + this.destWidth / 2, 0);
            ctx.lineTo(this.x + this.destWidth / 2, this.y + this.destHeight / 2);
            ctx.stroke();
            super.draw(ctx);
        }
    }
    class Ghost extends Enemy {
        angle = 0;
        curve = Math.random() * 0.3;
        constructor(canvasWidth, canvasHeight) {
            super(document.getElementById("ghost"));
            this.maxFrames = 6;
            this.srcWidth = this.image.width / this.maxFrames;
            this.srcHeight = this.image.height;
            this.destWidth = this.srcWidth / 2;
            this.destHeight = this.srcHeight / 2;
            this.x = canvasWidth;
            this.y = Math.random() * (canvasHeight - this.destHeight) * 0.6;
            this.vx = Math.random() * 0.2 + 0.1;
        }
        update(delta) {
            super.update(delta);
            this.y += Math.sin(this.angle) * (Math.random() + 1.5);
            this.angle += this.curve;
        }
        draw(ctx) {
            ctx.save();
            ctx.globalAlpha = 0.5;
            super.draw(ctx);
            ctx.restore();
        }
    }
    class Game {
        ctx;
        width;
        height;
        enemies = [];
        enemyInterval = 1000;
        enemyTimer = 0;
        enemyTypes = [
            Worm,
            Ghost,
            Spider,
        ];
        constructor(ctx, width, height) {
            this.ctx = ctx;
            this.width = width;
            this.height = height;
            this.addNewEnemy();
        }
        update(delta) {
            if (this.enemyTimer > this.enemyInterval) {
                this.enemyTimer = 0;
                this.addNewEnemy();
            }
            else {
                this.enemyTimer += delta;
            }
            this.enemies.forEach((enemy) => enemy.update(delta));
        }
        draw() {
            this.enemies.forEach((enemy) => enemy.draw(this.ctx));
        }
        addNewEnemy() {
            const enemy = new this.enemyTypes[Math.floor(Math.random() * (this.enemyTypes.length - 0.0001))](this.width, this.height);
            this.enemies.push(enemy);
            this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
            this.enemies.sort((a, b) => a.y - b.y);
        }
    }
    let lastTime = 0;
    const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);
    function animate(timestamp) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        // delta time is higher for slower pc's
        const delta = timestamp - lastTime;
        lastTime = timestamp;
        game.draw();
        game.update(delta);
        requestAnimationFrame(animate);
    }
    animate(0);
});

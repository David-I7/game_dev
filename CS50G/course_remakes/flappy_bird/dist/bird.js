import { gSounds } from "./globals.js";
export default class Bird {
    game;
    x = 0;
    y = 0;
    image = document.getElementById("bird");
    width = this.image.width;
    height = this.image.height;
    gravity = 600;
    antiGravity = -200;
    vy = 0;
    constructor(game) {
        this.game = game;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.y + game.height / 2 - this.height / 2;
    }
    draw(ctx) {
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
    update(dt, inputHandler) {
        if (inputHandler.wasPressed("Space") ||
            inputHandler.mousePressed() != null) {
            this.vy = this.antiGravity;
            gSounds.jump.play();
        }
        else {
            this.vy += this.gravity * dt;
        }
        this.y += this.vy * dt;
        this.y = Math.max(this.game.y, this.y);
    }
    reset() {
        this.y = this.game.y + this.game.height / 2 - this.height / 2;
        this.vy = 0;
    }
}

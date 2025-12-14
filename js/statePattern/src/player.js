import { AttackDownLeft, AttackDownRight, FallingLeft, FallingRight, JumpingLeft, JumpingRight, RunningLeft, RunningRight, SittingLeft, SittingRight, StandingLeft, StandingRight, } from "./state.js";
export default class Player {
    gameWidth;
    gameHeight;
    image = document.getElementById("dogImage");
    x = 0;
    y = 0;
    width = this.image.width / 9;
    height = this.image.height / 12;
    states = [
        new StandingRight(this),
        new StandingLeft(this),
        new SittingRight(this),
        new SittingLeft(this),
        new JumpingRight(this),
        new JumpingLeft(this),
        new FallingRight(this),
        new FallingLeft(this),
        new AttackDownRight(this),
        new AttackDownLeft(this),
        new RunningRight(this),
        new RunningLeft(this),
    ];
    currentState = this.states[0];
    frameX = 0;
    frameY = 0;
    maxFrameX = 7;
    vy = 0;
    vx = 0;
    gravity = 4;
    frameInterval = 1000 / 30;
    frameTimer = 0;
    constructor(gameWidth, gameHeight) {
        this.gameWidth = gameWidth;
        this.gameHeight = gameHeight;
        this.x = gameWidth / 2 - this.width / 2;
        this.y = gameHeight - this.height;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.frameX * this.width, this.frameY * this.height, this.width, this.height, this.x, this.y, this.width, this.height);
    }
    update(input, delta) {
        // state
        this.currentState.handleInput(input);
        // frame animation
        this.frameTimer += delta;
        if (this.frameTimer >= this.frameInterval) {
            this.frameX = (this.frameX + 1) % this.maxFrameX;
            this.frameTimer = 0;
        }
        // horizontal movement
        this.x = Math.min(Math.max(this.x + this.vx, 0), this.gameWidth - this.width);
        // vertical movement
        this.y = Math.min(this.vy + this.y, this.gameHeight - this.height);
        if (!this.onGround()) {
            this.vy += this.gravity;
        }
        else {
            this.vy = 0;
        }
    }
    setState(state) {
        this.currentState = this.states[state];
        this.currentState.enter();
    }
    onGround() {
        return this.y >= this.gameHeight - this.height;
    }
}

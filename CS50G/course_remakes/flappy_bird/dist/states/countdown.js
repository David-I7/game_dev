import { gGame, gStateMachine } from "../globals.js";
export default class CountdownState {
    interval = 0.75;
    countdownTimer = 0;
    count = 3;
    draw(ctx) {
        ctx.font = "50px flappy";
        ctx.textAlign = "center";
        ctx.fillText(`${this.count}`, gGame.width / 2, gGame.y + 130);
    }
    update(dt) {
        this.countdownTimer += dt;
        if (this.countdownTimer >= this.interval) {
            this.countdownTimer -= this.interval;
            --this.count;
            if (this.count == 0) {
                gStateMachine.change("play");
            }
        }
    }
    enter() {
        this.count = 3;
        this.countdownTimer = 0;
    }
    exit() { }
}

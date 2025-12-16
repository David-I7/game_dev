import { gGame, gStateMachine } from "../globals.js";
import State from "./state.js";

export default class CountdownState implements State {
  interval = 1;
  countdownTimer = 0;
  count = 3;
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = "50px flappy";
    ctx.textAlign = "center";
    ctx.fillText(`${this.count}`, gGame.width / 2, gGame.y + 130);
  }
  update(dt: number): void {
    this.countdownTimer += dt;
    if (this.countdownTimer >= this.interval) {
      this.countdownTimer -= this.interval;
      --this.count;
    }

    if (this.count == 0) {
      gStateMachine.change("play");
    }
  }
  enter(): void {
    this.count = 3;
    this.countdownTimer = 0;
  }
  exit(): void {}
}

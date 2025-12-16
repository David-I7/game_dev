import Bird from "../bird.js";
import PipeManager from "../pipeManager.js";
import State from "./state.js";
import { gInputHandler, gGame, gStateMachine } from "../globals.js";

export default class PlayState implements State {
  bird: Bird | null = null;
  pipeManager: PipeManager | null = null;
  score = 0;
  constructor() {}
  draw(ctx: CanvasRenderingContext2D): void {
    this.bird!.draw(ctx);
    this.pipeManager!.draw(ctx);

    ctx.font = "24px flappy";
    ctx.textAlign = "start";
    ctx.fillText(`Score: ${this.score}`, 16, gGame.y + 32);
  }
  update(dt: number): void {
    this.bird!.update(dt, gInputHandler);
    this.pipeManager!.update(dt);

    if (this.bird!.y + this.bird!.height >= gGame.y + gGame.height - 16) {
      gStateMachine.change("score", {
        score: this.score,
      });
      return;
    }
    for (let i = 0; i < this.pipeManager!.pipes.length; i++) {
      const pipePair = this.pipeManager!.pipes[i];
      if (pipePair.scored) continue;

      if (pipePair.collides(this.bird!)) {
        gStateMachine.change("score", {
          score: this.score,
        });
        return;
      } else if (pipePair.hasScored(this.bird!)) {
        ++this.score;
      }
    }
  }
  enter(): void {
    this.bird = new Bird(gGame);
    this.pipeManager = new PipeManager(gGame);
    this.score = 0;
  }
  exit(): void {
    this.bird = null;
    this.pipeManager = null;
  }
}

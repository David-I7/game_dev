import { gGame, gInputHandler, gStateMachine } from "../globals.js";
import { PlayContext } from "./play.js";
import State from "./state.js";

export default class PauseState implements State {
  private playContext: PlayContext | undefined;
  constructor() {}

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = "white";
    ctx.font = "50px flappy";
    ctx.textAlign = "center";
    ctx.fillText(`Game is paused`, gGame.width / 2, gGame.y + gGame.height / 2);
  }
  update(dt: number): void {
    if (gInputHandler.wasPressed("KeyP")) {
      gStateMachine.change("play", this.playContext);
    }
  }
  enter(enterParams: PlayContext): void {
    this.playContext = enterParams;
  }
  exit(): void {}
}

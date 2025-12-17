import State from "./state.js";
import { gGame, gInputHandler, gStateMachine } from "../globals.js";

export default class TitleScreenState implements State {
  draw(ctx: CanvasRenderingContext2D): void {
    ctx.font = "50px flappy";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText(`Fifty Bird`, gGame.width / 2, gGame.y + 100);
    ctx.font = "32px flappy";
    ctx.fillText(`Press Enter`, gGame.width / 2, gGame.y + 150);
  }
  update(dt: number): void {
    if (gInputHandler.wasPressed("Enter")) {
      gStateMachine.change("countdown");
    }
  }
  enter(enterParams: Record<string, any>): void {}
  exit(): void {}
}

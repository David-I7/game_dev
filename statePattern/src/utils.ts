import InputHandler from "./input";
import Player from "./player";

export function drawStatusText(
  ctx: CanvasRenderingContext2D,
  input: InputHandler,
  player: Player
) {
  ctx.font = "24px Helvetica";
  ctx.fillText(`Last input: ${input.lastKey}`, 24, 36);
  ctx.fillText(`Player status: ${player.currentState.stateName}`, 24, 70);
}

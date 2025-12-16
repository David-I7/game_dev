import { gGame, gInputHandler, gStateMachine } from "../globals.js";
export default class TitleScreenState {
    draw(ctx) {
        ctx.font = "50px flappy";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Fifty Bird`, gGame.width / 2, gGame.y + 100);
        ctx.font = "32px flappy";
        ctx.fillText(`Press Enter`, gGame.width / 2, gGame.y + 150);
    }
    update(dt) {
        if (gInputHandler.wasPressed("Enter")) {
            gStateMachine.change("countdown");
        }
    }
    enter(enterParams) { }
    exit() { }
}

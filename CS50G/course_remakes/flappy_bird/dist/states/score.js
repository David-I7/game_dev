import { gGame, gInputHandler, gStateMachine } from "../globals.js";
export default class ScoreState {
    score = 0;
    draw(ctx) {
        ctx.font = "50px flappy";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText(`Oof! You Lost!`, gGame.width / 2, gGame.y + 75);
        ctx.font = "24px flappy";
        ctx.fillText(`Score: ${this.score}`, gGame.width / 2, gGame.y + 120);
        ctx.fillText(`Press Enter to Play Again!!`, gGame.width / 2, gGame.y + 230);
    }
    update(dt) {
        if (gInputHandler.wasPressed("Enter")) {
            gStateMachine.change("play");
        }
    }
    enter(enterParams) {
        this.score = enterParams.score;
    }
    exit() { }
}

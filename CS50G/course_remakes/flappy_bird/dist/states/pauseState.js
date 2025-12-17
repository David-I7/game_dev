import { gGame, gInputHandler, gStateMachine } from "../globals.js";
export default class PauseState {
    playContext;
    constructor() { }
    draw(ctx) {
        ctx.fillStyle = "white";
        ctx.font = "50px flappy";
        ctx.textAlign = "center";
        ctx.fillText(`Game is paused`, gGame.width / 2, gGame.y + gGame.height / 2);
    }
    update(dt) {
        if (gInputHandler.wasPressed("KeyP")) {
            gStateMachine.change("play", this.playContext);
        }
    }
    enter(enterParams) {
        this.playContext = enterParams;
    }
    exit() { }
}

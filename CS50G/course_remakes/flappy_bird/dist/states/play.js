import Bird from "../bird.js";
import PipeManager from "../pipeManager.js";
import { gInputHandler, gGame, gStateMachine, gSounds } from "../globals.js";
export default class PlayState {
    bird = null;
    pipeManager = null;
    score = 0;
    constructor() { }
    draw(ctx) {
        this.bird.draw(ctx);
        this.pipeManager.draw(ctx);
        ctx.font = "24px flappy";
        ctx.textAlign = "start";
        ctx.fillText(`Score: ${this.score}`, 16, gGame.y + 32);
    }
    update(dt) {
        this.bird.update(dt, gInputHandler);
        this.pipeManager.update(dt);
        if (this.bird.y + this.bird.height >= gGame.y + gGame.height - 16) {
            gSounds.explosion.play();
            gSounds.hurt.play();
            gStateMachine.change("score", {
                score: this.score,
            });
            return;
        }
        for (let i = 0; i < this.pipeManager.pipes.length; i++) {
            const pipePair = this.pipeManager.pipes[i];
            if (pipePair.scored)
                continue;
            if (pipePair.collides(this.bird)) {
                gSounds.explosion.play();
                gSounds.hurt.play();
                gStateMachine.change("score", {
                    score: this.score,
                });
                return;
            }
            else if (pipePair.hasScored(this.bird)) {
                ++this.score;
                gSounds.score.play();
            }
        }
        if (gInputHandler.wasPressed("KeyP")) {
            gStateMachine.change("paused", {
                bird: this.bird,
                pipeManager: this.pipeManager,
                score: this.score,
            });
        }
    }
    enter(enterParams) {
        if (enterParams != undefined) {
            this.bird = enterParams.bird;
            this.pipeManager = enterParams.pipeManager;
            this.score = enterParams.score;
        }
        else {
            this.bird = new Bird(gGame);
            this.pipeManager = new PipeManager(gGame);
            this.score = 0;
        }
    }
    exit() {
        this.bird = null;
        this.pipeManager = null;
    }
}

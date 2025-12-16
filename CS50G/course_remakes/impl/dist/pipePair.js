import Pipe from "./pipe.js";
import { AABBColides } from "./utils.js";
export default class PipePair {
    scored = false;
    isMarkedForDeletion = false;
    pipes;
    constructor(width, topY, topHeight, bottomY, bottomHeight) {
        this.pipes = [
            new Pipe(width, bottomY, "bottom", bottomHeight),
            new Pipe(width, topY, "top", topHeight),
        ];
    }
    update(dt) {
        if (this.pipes[0].x + this.pipes[0].width <= 0) {
            this.isMarkedForDeletion = true;
        }
        this.pipes.forEach((pipe) => {
            pipe.update(dt);
        });
    }
    draw(ctx) {
        this.pipes.forEach((pipe) => {
            pipe.draw(ctx);
        });
    }
    reset() { }
    collides(bird) {
        if (this.scored)
            return false;
        return AABBColides(this.pipes[0], bird) || AABBColides(this.pipes[1], bird);
    }
    hasScored(bird) {
        if (this.scored)
            return false;
        return (this.scored = bird.x >= this.pipes[0].x + this.pipes[0].width);
    }
}

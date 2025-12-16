import Pipe from "./pipe.js";
import { AABBColides } from "./utils.js";
export default class PipeSpawner {
    game;
    pipes = [];
    spawnInterval = 0;
    spawnTimer = 0;
    gap = 80;
    range = [0, 0];
    lastY = 0;
    constructor(game) {
        this.game = game;
        this.game = game;
        this.range = [
            this.game.y + 32 + this.gap,
            this.game.y + this.game.height - 32 - 16,
        ];
        this.init();
    }
    init() {
        this.spawnInterval = Math.random() * 2 + 1;
        this.spawnTimer = 0;
        this.lastY =
            this.range[0] + Math.random() * (this.range[1] - this.range[0]);
        const heightB = this.game.y + this.game.height - this.lastY;
        const heightT = this.lastY - this.gap - this.game.y;
        this.pipes.push([
            new Pipe(this.game, this.lastY, "bottom", heightB),
            new Pipe(this.game, this.lastY - this.gap - heightT, "top", heightT),
        ]);
    }
    update(dt) {
        this.spawnTimer += dt;
        if (this.spawnTimer >= this.spawnInterval) {
            this.spawnTimer = 0;
            this.spawnInterval = Math.random() * 2 + 1.5;
            let newY = this.lastY + Math.random() * 40 - 20;
            newY = Math.min(Math.max(this.range[0], newY), this.range[1]);
            this.lastY = newY;
            const heightB = this.game.y + this.game.height - newY;
            const heightT = newY - this.gap - this.game.y;
            this.pipes.push([
                new Pipe(this.game, newY, "bottom", heightB),
                new Pipe(this.game, newY - this.gap - heightT, "top", heightT),
            ]);
        }
        for (let i = 0; i < this.pipes.length; ++i) {
            const pipePair = this.pipes[i];
            if (pipePair[0].x + pipePair[1].width <= 0) {
                this.pipes.splice(i, 1);
                --i;
            }
            else {
                pipePair.forEach((pair) => {
                    pair.update(dt);
                });
            }
        }
    }
    draw(ctx) {
        this.pipes.forEach((pipePair) => {
            pipePair.forEach((pair) => pair.draw(ctx));
        });
    }
    reset() {
        this.pipes = [];
        this.init();
    }
    colides(bird) {
        for (let i = 0; i < this.pipes.length; i++) {
            const pipePair = this.pipes[i];
            if (pipePair[0].x > bird.x + bird.width ||
                pipePair[0].x + pipePair[0].width < bird.x)
                continue;
            if (AABBColides(pipePair[0], bird))
                return true;
            else if (AABBColides(pipePair[1], bird))
                return true;
        }
    }
}

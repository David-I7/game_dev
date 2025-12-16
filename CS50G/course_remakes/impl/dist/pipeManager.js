import PipePair from "./pipePair.js";
export default class PipeManager {
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
        this.pipes.push(new PipePair(this.game.width, this.lastY - this.gap - heightT, heightT, this.lastY, heightB));
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
            this.pipes.push(new PipePair(this.game.width, newY - this.gap - heightT, heightT, newY, heightB));
        }
        for (let i = 0; i < this.pipes.length; ++i) {
            const pipePair = this.pipes[i];
            if (pipePair.isMarkedForDeletion) {
                this.pipes.splice(i, 1);
                --i;
            }
            else {
                pipePair.update(dt);
            }
        }
    }
    draw(ctx) {
        this.pipes.forEach((pipePair) => {
            pipePair.draw(ctx);
        });
    }
    reset() {
        this.pipes = [];
        this.init();
    }
}

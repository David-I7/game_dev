import Animatable from "./animatable.js";
import Game from "./game.js";
import PipePair from "./pipePair.js";

export default class PipeManager implements Animatable {
  pipes: PipePair[] = [];
  spawnInterval: number = 0;
  spawnTimer: number = 0;
  gap: number = 0;
  range: [number, number] = [0, 0];
  lastY: number = 0;
  constructor(public game: Game) {
    this.game = game;
    this.init();
  }

  init() {
    this.spawnInterval = Math.random() * 2 + 1;
    this.spawnTimer = 0;
    this.gap = 75 + Math.floor(Math.random() * 20);
    this.range = [
      this.game.y + 32 + this.gap,
      this.game.y + this.game.height - 32 - 16,
    ];
    this.lastY =
      this.range[0] + Math.random() * (this.range[1] - this.range[0]);
    const heightB = this.game.y + this.game.height - this.lastY;
    const heightT = this.lastY - this.gap - this.game.y;

    this.pipes.push(
      new PipePair(
        this.game.width,
        this.lastY - this.gap - heightT,
        heightT,
        this.lastY,
        heightB
      )
    );
  }

  update(dt: number): void {
    this.spawnTimer += dt;

    if (this.spawnTimer >= this.spawnInterval) {
      this.gap = 75 + Math.floor(Math.random() * 15);
      this.spawnTimer = 0;
      this.spawnInterval = Math.random() * 2 + 1.5;

      let newY = this.lastY + Math.random() * 40 - 20;
      newY = Math.min(Math.max(this.range[0], newY), this.range[1]);
      this.lastY = newY;

      const heightB = this.game.y + this.game.height - newY;
      const heightT = newY - this.gap - this.game.y;

      this.pipes.push(
        new PipePair(
          this.game.width,
          newY - this.gap - heightT,
          heightT,
          newY,
          heightB
        )
      );
    }

    for (let i = 0; i < this.pipes.length; ++i) {
      const pipePair = this.pipes[i];
      if (pipePair.isMarkedForDeletion) {
        this.pipes.splice(i, 1);
        --i;
      } else {
        pipePair.update(dt);
      }
    }
  }

  draw(ctx: CanvasRenderingContext2D): void {
    this.pipes.forEach((pipePair) => {
      pipePair.draw(ctx);
    });
  }
  reset(): void {
    this.pipes = [];
    this.init();
  }
}

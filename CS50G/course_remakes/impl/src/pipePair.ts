import Animatable from "./animatable.js";
import Bird from "./bird.js";
import Pipe from "./pipe.js";
import { AABBColides } from "./utils.js";

export default class PipePair implements Animatable {
  scored: boolean = false;
  isMarkedForDeletion: boolean = false;
  private pipes: [Pipe, Pipe];
  constructor(
    width: number,
    topY: number,
    topHeight: number,
    bottomY: number,
    bottomHeight: number
  ) {
    this.pipes = [
      new Pipe(width, bottomY, "bottom", bottomHeight),
      new Pipe(width, topY, "top", topHeight),
    ];
  }

  update(dt: number): void {
    if (this.pipes[0].x + this.pipes[0].width <= 0) {
      this.isMarkedForDeletion = true;
    }
    this.pipes.forEach((pipe) => {
      pipe.update(dt);
    });
  }
  draw(ctx: CanvasRenderingContext2D): void {
    this.pipes.forEach((pipe) => {
      pipe.draw(ctx);
    });
  }
  reset(): void {}

  collides(bird: Bird) {
    if (this.scored) return false;

    return AABBColides(this.pipes[0], bird) || AABBColides(this.pipes[1], bird);
  }
  hasScored(bird: Bird) {
    if (this.scored) return false;
    return (this.scored = bird.x >= this.pipes[0].x + this.pipes[0].width);
  }
}

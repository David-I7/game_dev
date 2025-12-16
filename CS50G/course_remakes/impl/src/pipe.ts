import Drawable from "./drawable.js";
import Animatable from "./animatable.js";
import Game from "./game.js";

const PIPE_IMAGE = document.getElementById("pipe") as HTMLImageElement;
export const PIPE_HEIGHT = PIPE_IMAGE.height;

export default class Pipe implements Animatable, Drawable {
  x: number = 0;
  y: number = 0;

  width: number = PIPE_IMAGE.width;
  height: number = PIPE_IMAGE.height;
  vx: number = -80;

  constructor(
    x: number,
    y: number,
    public orientation: "bottom" | "top",
    height: number
  ) {
    this.x = x;
    this.y = y;
    this.height = height;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    if (this.orientation == "top") {
      ctx.save();
      ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
      ctx.rotate(Math.PI);
      ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
    }

    ctx.drawImage(
      PIPE_IMAGE,
      0,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );

    if (this.orientation == "top") {
      ctx.restore();
    }
  }

  update(dt: number): void {
    this.x += this.vx * dt;
  }

  reset(): void {}
}

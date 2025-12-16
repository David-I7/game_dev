import Drawable from "./drawable.js";
import Animatable from "./animatable.js";
import Game from "./game.js";

export default class Background implements Animatable, Drawable {
  x: number = 0;
  y: number = 0;
  image: HTMLImageElement = document.getElementById(
    "background"
  ) as HTMLImageElement;
  width: number;
  height: number;

  constructor(public game: Game, public vx: number) {
    this.width = this.image.width;
    this.height = this.image.height;
    this.y = game.y;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width - 1,
      this.y,
      this.width,
      this.height
    );
  }
  update(dt: number) {
    this.x += this.vx * dt;
    if (this.x + this.width <= 0) {
      this.x = this.x + this.width;
    }
  }

  reset(): void {
    this.x = 0;
  }
}

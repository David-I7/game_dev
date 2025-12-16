import Drawable from "./drawable.js";
import Animatable from "./animatable.js";

export default class Ground implements Animatable, Drawable {
  x: number = 0;
  y: number = 0;
  image: HTMLImageElement = document.getElementById(
    "ground"
  ) as HTMLImageElement;
  width: number;
  height: number;

  constructor(y: number, public vx: number) {
    this.width = this.image.width;
    this.height = this.image.height;
    this.y = y - this.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
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

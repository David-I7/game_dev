import Drawable from "./drawable.js";
import Animatable from "./animatable.js";
import InputHandler from "./inputHandler.js";
import Game from "./game.js";

export default class Bird implements Animatable, Drawable {
  x: number = 0;
  y: number = 0;
  image: HTMLImageElement = document.getElementById("bird") as HTMLImageElement;
  width: number = this.image.width;
  height: number = this.image.height;
  gravity: number = 600;
  antiGravity = -200;
  vy: number = 0;

  constructor(public game: Game) {
    this.x = game.width / 2 - this.width / 2;
    this.y = game.y + game.height / 2 - this.height / 2;
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.strokeRect(this.x, this.y, this.width, this.height);
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  update(dt: number, inputHandler: InputHandler): void {
    if (inputHandler.wasPressed("Space")) {
      this.vy = this.antiGravity;
    } else {
      this.vy += this.gravity * dt;
    }
    this.y += this.vy * dt;
    this.y = Math.max(this.game.y, this.y);
  }
  reset(): void {
    this.y = this.game.y + this.game.height / 2 - this.height / 2;
    this.vy = 0;
  }
}

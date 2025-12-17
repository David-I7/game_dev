export default class Game {
  width: number;
  height: number;
  x: number;
  y: number;
  state: "playing" | "paused" = "playing";
  constructor(canvasWidth: number, canvasHeight: number) {
    this.width = canvasWidth;
    this.x = 0;
    const bg = document.getElementById("background") as HTMLImageElement;
    this.height = bg.height;
    this.y = canvasHeight / 2 - bg.height / 2;
  }
}

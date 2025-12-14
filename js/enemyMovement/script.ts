const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);

let GAME_FRAME = 0;

class Enemy {
  public x: number = 0;
  public y: number = 0;
  public newX: number = 0;
  public newY: number = 0;
  public sourceWidth: number = 0;
  public sourceHeight: number = 0;
  public destWidth: number = 0;
  public destHeight: number = 0;
  public speed: number = Math.random() * 3 + 0.5;
  public frame: number = 0;
  public interval: number = 0;
  public flapSpeed: number = Math.floor(Math.random() * 3 + 1);
  constructor(private image: HTMLImageElement) {
    this.sourceWidth = Math.floor(image.width / 9);
    this.sourceHeight = image.height;
    let scale = Math.random() * 2 + 2;
    this.destWidth = this.sourceWidth / scale;
    this.destHeight = this.sourceHeight / scale;
    this.x = Math.random() * (CANVAS_WIDTH - this.destWidth);
    this.y = Math.random() * (CANVAS_HEIGHT - this.destHeight);
    this.newX = Math.random() * (CANVAS_WIDTH - this.destWidth);
    this.newY = Math.random() * (CANVAS_HEIGHT - this.destHeight);
    this.interval = Math.floor(Math.random() * 200 + 50);
  }

  update(delta: number) {
    if (GAME_FRAME % this.interval == 0) {
      this.newX = Math.random() * (CANVAS_WIDTH - this.destWidth);
      this.newY = Math.random() * (CANVAS_HEIGHT - this.destHeight);
    }
    let dx = this.x - this.newX;
    let dy = this.y - this.newY;
    this.x -= dx / 20;
    this.y -= dy / 20;
    if (this.x + this.destWidth < 0) this.x = CANVAS_WIDTH;
    // animate frames
    this.frame = Math.floor(GAME_FRAME / this.flapSpeed) % 9;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frame * this.sourceWidth,
      0,
      this.sourceWidth,
      this.sourceHeight,
      this.x,
      this.y,
      this.destWidth,
      this.destHeight
    );
  }
}

const numberOfEnemies = 10;
const enemies: Enemy[] = [];

for (let i = 0; i < numberOfEnemies; ++i) {
  const img = new Image();
  img.src = "./public/enemy4.png";
  enemies.push(new Enemy(img));
}

function animate(delta: number) {
  GAME_FRAME++;
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  enemies.forEach((enemy) => {
    enemy.draw(ctx);
    enemy.update(delta);
  });
}

window.addEventListener("load", () => {
  let lastTime = 0;
  const fps = 60;
  const frameDuration = 1000 / fps; // ~16.67ms

  function loop(timestamp: number) {
    const delta = timestamp - lastTime;

    if (delta >= frameDuration) {
      animate(delta / frameDuration);
      lastTime = timestamp;
    }

    requestAnimationFrame(loop);
  }
  loop(0);
});

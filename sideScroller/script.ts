window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const CANVAS_WIDTH = (canvas.width = window.innerWidth);
  const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

  interface Animatable {
    update(...args: any[]): void;
    draw(...args: any[]): void;
  }

  interface Coordinates {
    x: number;
    y: number;
    width: number;
    height: number;
  }

  const keyEvents = [
    "ArrowDown",
    "ArrowUp",
    "ArrowLeft",
    "ArrowRight",
  ] as const;
  const keyEventsSet = new Set<string>(keyEvents);

  // adds event listeners and keeps track of key presses
  class InputHandler {
    public keys: Set<(typeof keyEvents)[number]> = new Set();
    constructor() {
      window.addEventListener("keydown", (e) => {
        if (keyEventsSet.has(e.key)) {
          this.keys.add(e.key as (typeof keyEvents)[number]);
        }
      });
      window.addEventListener("keyup", (e) => {
        if (keyEventsSet.has(e.key)) {
          this.keys.delete(e.key as (typeof keyEvents)[number]);
        }
      });
    }
  }

  class Player implements Coordinates, Animatable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public image: HTMLImageElement;
    public frameX: number = 0;
    public frameY: number = 0;
    public vx: number = 0;
    public vy: number = 0;
    public weight: number = 92;
    public fps = 20;
    public frameTimer = 0;
    public frameInterval = 1000 / this.fps;
    public maxFrameX = 6;

    constructor(public gameWidth: number, public gameHeight: number) {
      this.image = document.getElementById("player") as HTMLImageElement;
      this.width = this.image.width / 9;
      this.height = this.image.height / 2;
      this.y = gameHeight - this.height;
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        this.frameY * this.height,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(delta: number, input: InputHandler, enemies: Enemy[]): void {
      // collsion detection
      enemies.forEach((enemy) => {
        const dx = enemy.x + enemy.width / 2 - (this.x + this.width / 2);
        const dy = enemy.y + enemy.height / 2 - (this.y + this.height / 2);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const radii = enemy.width / 2 + this.width / 2;
        if (distance < radii) {
          gameover = true;
        }
      });

      // sprite animation
      this.frameTimer += delta;
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        this.frameX = (this.frameX + 1) % this.maxFrameX;
      }

      const pxPerSec = delta * 0.001;

      //horizontal movement
      if (input.keys.has("ArrowRight")) {
        this.vx = 600;
      } else if (input.keys.has("ArrowLeft")) {
        this.vx = -600;
      } else {
        this.vx = 0;
      }
      this.x += this.vx * pxPerSec;
      this.x = Math.max(Math.min(this.gameWidth - this.width, this.x), 0);

      //vertical movement
      if (input.keys.has("ArrowUp") && this.onGround()) {
        this.vy -= 4000;
      }

      this.y += this.vy * pxPerSec;
      if (!this.onGround()) {
        this.vy += this.weight;
        this.frameY = 1;
        this.maxFrameX = 7;
      } else {
        this.vy = 0;
        this.frameY = 0;
        this.maxFrameX = 9;
      }
      this.y = Math.max(Math.min(this.gameHeight - this.height, this.y), 0);
    }

    onGround() {
      return this.y >= this.gameHeight - this.height;
    }
  }

  class Background implements Animatable, Coordinates {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public image: HTMLImageElement;
    public vx: number = -200;

    constructor(public gameWidth: number, public gameHeight: number) {
      this.image = document.getElementById("background") as HTMLImageElement;
      this.width = Math.floor(this.image.width);
      this.height = gameHeight;
    }

    update(delta: number): void {
      const pxPerSec = delta * 0.001;

      this.x += this.vx * pxPerSec;
      if (this.x + this.width <= 0) {
        this.x = 0;
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
      ctx.drawImage(
        this.image,
        this.x + this.width - 2,
        this.y,
        this.width,
        this.height
      );
    }
  }

  class Enemy implements Coordinates, Animatable {
    public x: number = 0;
    public y: number = 0;
    public width: number = 0;
    public height: number = 0;
    public image: HTMLImageElement;
    public frameX: number = 0;
    public maxFrameX: number = 6;
    public fps = 20;
    public frameTimer = 0;
    public frameInterval = 1000 / this.fps;
    public vx: number = Math.random() * -300 - 100;
    public isMarkedForDeletion: boolean = false;

    constructor(public gameWidth: number, public gameHeight: number) {
      this.image = document.getElementById("enemy") as HTMLImageElement;
      this.width = this.image.width / 6;
      this.height = this.image.height;
      this.y = gameHeight - this.height;
      this.x = gameWidth;
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.strokeStyle = "white";
      ctx.beginPath();
      ctx.arc(
        this.x + this.width / 2,
        this.y + this.height / 2,
        this.width / 2,
        0,
        Math.PI * 2
      );
      ctx.stroke();
      ctx.drawImage(
        this.image,
        this.frameX * this.width,
        0,
        this.width,
        this.height,
        this.x,
        this.y,
        this.width,
        this.height
      );
    }

    update(delta: number): void {
      this.frameTimer += delta;
      if (this.frameTimer > this.frameInterval) {
        this.frameTimer = 0;
        this.frameX = (this.frameX + 1) % this.maxFrameX;
      }
      const pxPerSec = delta * 0.001;
      this.x += this.vx * pxPerSec;
      if (this.x + this.width < 0 && !this.isMarkedForDeletion) {
        this.isMarkedForDeletion = true;
        score++;
      }
    }
  }

  let lastTime = 0;
  let enemyTimer = 0;
  const enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  const inputHandler = new InputHandler();
  const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
  const background = new Background(CANVAS_WIDTH, CANVAS_HEIGHT);
  let enemies: Enemy[] = [];

  function handleEnemies(delta: number) {
    enemyTimer += delta;
    if (enemyTimer >= enemyInterval + randomEnemyInterval) {
      randomEnemyInterval = Math.random() * 1000 + 500;
      enemyTimer = 0;
      enemies.push(new Enemy(CANVAS_WIDTH, CANVAS_HEIGHT));
      enemies = enemies.filter((enemy) => !enemy.isMarkedForDeletion);
    }

    enemies.forEach((enemy) => {
      enemy.draw(ctx);
      enemy.update(delta);
    });
  }

  let score = 0;
  let gameover = false;

  function displayStatusText(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "black";
    ctx.font = "40px helvetica";
    ctx.fillText(`Score: ${score}`, 20, 50);
    ctx.fillStyle = "white";
    ctx.fillText(`Score: ${score}`, 18, 48);
  }

  function animate(timestamp: number) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // delta time is higher for slower pc's
    const delta = timestamp - lastTime;
    lastTime = timestamp;
    background.draw(ctx);

    displayStatusText(ctx);
    handleEnemies(delta);
    player.draw(ctx);
    player.update(delta, inputHandler, enemies);
    if (!gameover) {
      requestAnimationFrame(animate);
    } else {
      ctx.textAlign = "center";
      ctx.fillStyle = "black";
      ctx.fillText(
        `GAME OVER, try again!`,
        CANVAS_WIDTH / 2,
        CANVAS_HEIGHT / 2
      );
      ctx.fillStyle = "white";
      ctx.fillText(
        `GAME OVER, try again!`,
        CANVAS_WIDTH / 2 - 2,
        CANVAS_HEIGHT / 2 - 2
      );
    }
  }
  animate(0);
});

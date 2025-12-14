window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const CANVAS_WIDTH = (canvas.width = window.innerWidth);
  const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

  interface Animatable {
    update(delta: number): void;
    draw(ctx: CanvasRenderingContext2D): void;
  }

  class Enemy implements Animatable {
    public markedForDeletion = false;
    public x: number = 0;
    public y: number = 0;
    public srcWidth: number = 0;
    public srcHeight: number = 0;
    public destWidth: number = 0;
    public destHeight: number = 0;
    public frame: number = 0;
    public maxFrames: number = 0;
    public vx: number = 0;
    public vy: number = 0;
    public frameTimer = 0;
    public frameInterval = 100;

    constructor(public image: HTMLImageElement) {}

    update(delta: number): void {
      if (this.x + this.destWidth < 0) {
        this.markedForDeletion = true;
      }
      this.x -= this.vx * delta;
      this.frameTimer += delta;
      if (this.frameTimer > this.frameInterval) {
        this.frame = (this.frame + 1) % this.maxFrames;
        this.frameTimer -= this.frameInterval;
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.drawImage(
        this.image,
        this.frame * this.srcWidth,
        0,
        this.srcWidth,
        this.srcHeight,
        this.x,
        this.y,
        this.destWidth,
        this.destHeight
      );
    }
  }

  class Worm extends Enemy {
    constructor(canvasWidth: number, canvasHeight: number) {
      super(document.getElementById("worm") as HTMLImageElement);
      this.maxFrames = 6;
      this.srcWidth = this.image.width / this.maxFrames;
      this.srcHeight = this.image.height;
      this.destWidth = this.srcWidth / 2;
      this.destHeight = this.srcHeight / 2;
      this.x = canvasWidth;
      this.y = canvasHeight - this.destHeight;
      this.vx = Math.random() * 0.1 + 0.1;
    }
  }
  class Spider extends Enemy {
    public maxLen = 0;
    constructor(canvasWidth: number, canvasHeight: number) {
      super(document.getElementById("spider") as HTMLImageElement);
      this.maxFrames = 6;
      this.srcWidth = this.image.width / this.maxFrames;
      this.srcHeight = this.image.height;
      this.destWidth = this.srcWidth / 2;
      this.destHeight = this.srcHeight / 2;
      this.x = Math.random() * (canvasWidth - this.destWidth);
      this.y = 0 - this.destHeight;
      this.vx = 0;
      this.vy = Math.random() * 0.1 + 0.1;
      this.maxLen = Math.random() * (canvasHeight - this.destHeight);
    }

    update(delta: number): void {
      super.update(delta);
      this.y += this.vy * delta;
      if (this.y < 0 - this.destHeight * 2) this.markedForDeletion = true;
      if (this.y > this.maxLen) {
        this.vy *= -1;
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.moveTo(this.x + this.destWidth / 2, 0);
      ctx.lineTo(this.x + this.destWidth / 2, this.y + this.destHeight / 2);
      ctx.stroke();
      super.draw(ctx);
    }
  }
  class Ghost extends Enemy {
    public angle: number = 0;
    public curve: number = Math.random() * 0.3;
    constructor(canvasWidth: number, canvasHeight: number) {
      super(document.getElementById("ghost") as HTMLImageElement);
      this.maxFrames = 6;
      this.srcWidth = this.image.width / this.maxFrames;
      this.srcHeight = this.image.height;
      this.destWidth = this.srcWidth / 2;
      this.destHeight = this.srcHeight / 2;
      this.x = canvasWidth;
      this.y = Math.random() * (canvasHeight - this.destHeight) * 0.6;
      this.vx = Math.random() * 0.2 + 0.1;
    }

    update(delta: number) {
      super.update(delta);
      this.y += Math.sin(this.angle) * (Math.random() + 1.5);
      this.angle += this.curve;
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.save();
      ctx.globalAlpha = 0.5;
      super.draw(ctx);
      ctx.restore();
    }
  }

  class Game {
    private enemies: Enemy[] = [];
    private enemyInterval = 1000;
    private enemyTimer = 0;
    private enemyTypes: (new (...args: any[]) => Enemy)[] = [
      Worm,
      Ghost,
      Spider,
    ];
    constructor(
      public ctx: CanvasRenderingContext2D,
      public width: number,
      public height: number
    ) {
      this.addNewEnemy();
    }

    update(delta: number) {
      if (this.enemyTimer > this.enemyInterval) {
        this.enemyTimer = 0;
        this.addNewEnemy();
      } else {
        this.enemyTimer += delta;
      }
      this.enemies.forEach((enemy) => enemy.update(delta));
    }

    draw() {
      this.enemies.forEach((enemy) => enemy.draw(this.ctx));
    }

    private addNewEnemy() {
      const enemy = new this.enemyTypes[
        Math.floor(Math.random() * (this.enemyTypes.length - 0.0001))
      ](this.width, this.height);
      this.enemies.push(enemy);
      this.enemies = this.enemies.filter((enemy) => !enemy.markedForDeletion);
      this.enemies.sort((a, b) => a.y - b.y);
    }
  }

  let lastTime = 0;

  const game = new Game(ctx, CANVAS_WIDTH, CANVAS_HEIGHT);

  function animate(timestamp: number) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // delta time is higher for slower pc's
    const delta = timestamp - lastTime;
    lastTime = timestamp;

    game.draw();
    game.update(delta);

    requestAnimationFrame(animate);
  }
  animate(0);
});

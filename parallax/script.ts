const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);

let gameSpeed = 5;
let gameFrame = 0;

const backgroundLayer1 = new Image();
backgroundLayer1.src = "./public/images/layer-1.png";
const backgroundLayer2 = new Image();
backgroundLayer2.src = "./public/images/layer-2.png";
const backgroundLayer3 = new Image();
backgroundLayer3.src = "./public/images/layer-3.png";
const backgroundLayer4 = new Image();
backgroundLayer4.src = "./public/images/layer-4.png";
const backgroundLayer5 = new Image();
backgroundLayer5.src = "./public/images/layer-5.png";

class Layer {
  public x: number;
  public y: number;
  public width: number;
  public height: number;
  public speed: number;

  constructor(public image: HTMLImageElement, public speedModifier: number) {
    this.x = 0;
    this.y = 0;
    this.width = image.width;
    this.height = image.height;
    this.speed = gameSpeed * this.speedModifier;
  }

  update() {
    this.speed = gameSpeed * this.speedModifier;
    // if (this.x <= -this.width) {
    //   this.x = 0;
    // }
    // this.x = Math.floor(this.x - this.speed);
    this.x = (gameFrame * this.speed) % this.width;
  }

  draw() {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    ctx.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}

const layer1 = new Layer(backgroundLayer1, 0.2);
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObjects = [layer1, layer2, layer3, layer4, layer5];

const slider = document.getElementById("slider") as HTMLInputElement;
slider.value = gameSpeed.toString();
const showGameSpeed = document.getElementById(
  "showGameSpeed"
) as HTMLSpanElement;
showGameSpeed.innerHTML = gameSpeed.toString();

slider.addEventListener("change", (e) => {
  gameSpeed = Number((e.currentTarget as HTMLInputElement).value);
  showGameSpeed.innerHTML = gameSpeed.toString();
});

function animate() {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  gameObjects.forEach((obj) => {
    obj.draw();
    obj.update();
  });
  --gameFrame;
  requestAnimationFrame(animate);
}

animate();

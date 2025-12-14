"use strict";
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");
const CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);
ctx.fillStyle = "white";
ctx.strokeStyle = "red";
let GAME_FRAME = 0;
class Explosion {
  x;
  y;
  srcWidth = 0;
  srcHeight = 0;
  destWidth = 0;
  destHeight = 0;
  image;
  frame = 0;
  stagger = 5;
  angle = Math.random() * Math.PI * 2;
  sound = new Audio("public/audio/boom.");
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.srcWidth = 200;
    this.srcHeight = 179;
    this.destHeight = this.srcHeight / 2;
    this.destWidth = this.srcWidth / 2;
    this.image = new Image();
    this.image.src = "public/images/boom.png";
    this.sound.src = "public/audio/Fire impact 1.wav";
  }
  update(delta) {
    if (GAME_FRAME % this.stagger == 0) if (this.frame == 0) this.sound.play();
    this.frame++;
  }
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.image,
      this.frame * this.srcWidth,
      0,
      this.srcWidth,
      this.srcHeight,
      0 - this.destWidth / 2,
      0 - this.destHeight / 2,
      this.destWidth,
      this.destHeight
    );
    ctx.restore();
  }
}
const explosions = [];
function createAnimation(x, y) {
  explosions.push(new Explosion(x, y));
}
function loop(delta) {
  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  for (let i = 0; i < explosions.length; i++) {
    explosions[i].draw();
    explosions[i].update(delta);
    if (explosions[i].frame > 5) {
      explosions.splice(i, 1);
      i--;
    }
  }
}
canvas.addEventListener("click", (e) => {
  createAnimation(e.offsetX, e.offsetY);
});
// const mouseMoveHandler = (e: MouseEvent) => {
//   createAnimation(e.offsetX, e.offsetY);
// };
// canvas.addEventListener("mousedown", () => {
//   hasMouseDown = true;
//   canvas.addEventListener("mousemove", mouseMoveHandler);
// });
// canvas.addEventListener("mouseup", () => {
//   hasMouseDown = false;
//   canvas.removeEventListener("mousemove", mouseMoveHandler);
// });
window.addEventListener("load", () => {
  const FPS = 60;
  const FRAME_DURATION = 1000 / FPS;
  let start = 0;
  function animate(timestamp) {
    const interval = timestamp - start;
    if (interval >= FRAME_DURATION) {
      loop(interval / FRAME_DURATION);
      start = timestamp;
      GAME_FRAME++;
    }
    requestAnimationFrame(animate);
  }
  animate(0);
});

const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
const ctx = canvas.getContext("2d")!;
const CANVAS_WIDTH = (canvas.width = canvas.offsetWidth);
const CANVAS_HEIGHT = (canvas.height = canvas.offsetHeight);

const playerImage = new Image();
playerImage.src = "shadow_dog.png";

const spriteWidth = 575;
const spriteHeight = 523;
const stagger = 5;

let gameFrame = 0;
let playerState = "run";

const select = document.getElementById("animations") as HTMLSelectElement;
select.addEventListener(
  "change",
  (e) => (playerState = (e.currentTarget as HTMLSelectElement).value)
);

const spriteAnimations: Record<
  string,
  Record<string, Record<string, number>[]>
> = {};

const animationStates = [
  {
    name: "idle",
    frames: 7,
  },
  {
    name: "jump",
    frames: 7,
  },
  {
    name: "fall",
    frames: 7,
  },
  {
    name: "run",
    frames: 9,
  },
  {
    name: "dizzy",
    frames: 11,
  },
  {
    name: "sit",
    frames: 5,
  },
  {
    name: "roll",
    frames: 7,
  },
  {
    name: "bite",
    frames: 7,
  },
  {
    name: "ko",
    frames: 12,
  },
  {
    name: "getHit",
    frames: 4,
  },
];

animationStates.forEach((state, y) => {
  let frames: Record<string, Record<string, number>[]> = {
    loc: [],
  };

  for (let i = 0; i < state.frames; ++i) {
    frames.loc.push({ x: i * spriteWidth, y: y * spriteHeight });
  }
  spriteAnimations[state.name] = frames;
});

function animate() {
  let position =
    Math.floor(gameFrame / stagger) % spriteAnimations[playerState].loc.length;
  if (gameFrame % stagger == 0) {
    let framex = spriteWidth * position;
    let framey = spriteAnimations[playerState].loc[position].y;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.drawImage(
      playerImage,
      framex,
      framey,
      spriteWidth,
      spriteHeight,
      0,
      0,
      CANVAS_WIDTH,
      CANVAS_HEIGHT
    );
  }
  ++gameFrame;
  requestAnimationFrame(animate);
}

animate();

import Background from "./background.js";
import Ground from "./ground.js";
import { displayFps } from "./utils.js";
import GLOBALS from "./globals.js";

window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const CANVAS_WIDTH = (canvas.width = window.innerWidth);
  const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

  const backgroundSpeed = -120;
  const background = new Background(GLOBALS.gGame, backgroundSpeed / 2);
  const ground = new Ground(background.y + background.height, backgroundSpeed);

  let lastTime = 0;

  const fps = displayFps();
  GLOBALS.gStateMachine.change("title");

  function animate(timestamp: number) {
    const dt = (timestamp - lastTime) / 1000;
    lastTime = timestamp;
    ctx.clearRect(0, 0, GLOBALS.gGame.width, CANVAS_HEIGHT);
    fps(dt, ctx, { fillStyle: "red" });

    GLOBALS.gStateMachine.update(dt);
    background.update(dt);
    ground.update(dt);

    background.draw(ctx);
    ground.draw(ctx);

    GLOBALS.gStateMachine.draw(ctx);

    GLOBALS.gInputHandler.update();

    requestAnimationFrame(animate);
  }
  animate(0);
});

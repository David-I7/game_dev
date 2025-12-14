import Player from "./player.js";
import InputHandler from "./input.js";
import { drawStatusText } from "./utils.js";
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = (canvas.width = window.innerWidth);
    const CANVAS_HEIGHT = (canvas.height = window.innerHeight);
    const loading = document.getElementById("loading");
    loading.style.display = "none";
    const player = new Player(CANVAS_WIDTH, CANVAS_HEIGHT);
    const inputHandler = new InputHandler();
    let lastTime = 0;
    function animate(timestamp) {
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        const delta = timestamp - lastTime;
        lastTime = timestamp;
        drawStatusText(ctx, inputHandler, player);
        player.draw(ctx);
        player.update(inputHandler, delta);
        requestAnimationFrame(animate);
    }
    animate(0);
});

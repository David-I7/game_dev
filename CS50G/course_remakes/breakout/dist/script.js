import "./dependencies.js";
import ResourceManager from "./dependencies.js";
ResourceManager.load();
window.addEventListener("load", () => {
    const canvas = document.getElementById("canvas1");
    const ctx = canvas.getContext("2d");
    const CANVAS_WIDTH = (canvas.width = window.innerWidth);
    const CANVAS_HEIGHT = (canvas.height = window.innerHeight);
    let lastTime = 0;
    console.log(ResourceManager.frames, ResourceManager.graphics, ResourceManager.sounds);
    function animate(timestamp) {
        const dt = (lastTime - timestamp) / 1000;
        lastTime = timestamp;
        ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        requestAnimationFrame(animate);
    }
    animate(0);
});

window.addEventListener("load", async () => {
  const deps = await import("./dependencies.js");

  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;
  const CANVAS_WIDTH = (canvas.width = window.innerWidth);
  const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

  let lastTime = 0;

  function animate(timestamp: number) {
    const dt = (lastTime - timestamp) / 1000;
    lastTime = timestamp;
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    requestAnimationFrame(animate);
  }
  animate(0);
});

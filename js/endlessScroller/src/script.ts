window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

  const CANVAS_WIDTH = (canvas.width = window.innerWidth);
  const CANVAS_HEIGHT = (canvas.height = window.innerHeight);

  function animate(timestamp: number) {
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }
  animate(0);
});

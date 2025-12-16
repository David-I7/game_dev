export default class Game {
    width;
    height;
    x;
    y;
    state = "playing";
    constructor(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.x = 0;
        const bg = document.getElementById("background");
        this.height = bg.height;
        this.y = canvasHeight / 2 - bg.height / 2;
    }
}

const PIPE_IMAGE = document.getElementById("pipe");
export const PIPE_HEIGHT = PIPE_IMAGE.height;
export default class Pipe {
    orientation;
    x = 0;
    y = 0;
    width = PIPE_IMAGE.width;
    height = PIPE_IMAGE.height;
    vx = -80;
    constructor(x, y, orientation, height) {
        this.orientation = orientation;
        this.x = x;
        this.y = y;
        this.height = height;
    }
    draw(ctx) {
        if (this.orientation == "top") {
            ctx.save();
            ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
            ctx.rotate(Math.PI);
            ctx.translate(-(this.x + this.width / 2), -(this.y + this.height / 2));
        }
        ctx.drawImage(PIPE_IMAGE, 0, 0, this.width, this.height, this.x, this.y, this.width, this.height);
        if (this.orientation == "top") {
            ctx.restore();
        }
    }
    update(dt) {
        this.x += this.vx * dt;
    }
    reset() { }
}

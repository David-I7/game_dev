export default class Foreground {
    vx;
    x = 0;
    y = 0;
    image = document.getElementById("foreground");
    width = this.image.width;
    height = this.image.height;
    constructor(vx) {
        this.vx = vx;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);
    }
    update(dt) {
        this.x += this.vx * dt;
        if (this.x + this.width <= 0) {
            this.x = this.x + this.width;
        }
    }
}

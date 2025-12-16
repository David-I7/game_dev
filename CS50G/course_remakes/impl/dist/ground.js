export default class Ground {
    vx;
    x = 0;
    y = 0;
    image = document.getElementById("ground");
    width;
    height;
    constructor(y, vx) {
        this.vx = vx;
        this.width = this.image.width;
        this.height = this.image.height;
        this.y = y - this.height;
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
    reset() {
        this.x = 0;
    }
}

export default class Background {
    game;
    vx;
    x = 0;
    y = 0;
    image = document.getElementById("background");
    width;
    height;
    constructor(game, vx) {
        this.game = game;
        this.vx = vx;
        this.width = this.image.width;
        this.height = this.image.height;
        this.y = game.y;
    }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width - 1, this.y, this.width, this.height);
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

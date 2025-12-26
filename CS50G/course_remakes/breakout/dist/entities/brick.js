import { AudioManager } from "../audioManager.js";
import { gGameConfig } from "../config/gameConfig.js";
import { ResourceManager } from "../resourceManager.js";
export class Brick {
    x;
    y;
    color;
    tier;
    width;
    height;
    image;
    inPlay = true;
    constructor(x, y, color = 0, tier = 0) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.tier = tier;
        this._setImage();
    }
    _setImage() {
        this.image = ResourceManager.frames.bricks[this.color * 4 + this.tier];
        this.width = this.image.width * gGameConfig.viewport.scaler;
        this.height = this.image.height * gGameConfig.viewport.scaler;
    }
    setImage(color, tier) {
        this.color = color;
        this.tier = tier;
        this._setImage();
    }
    hit() {
        AudioManager.play("brick-hit-2");
        --this.color;
        if (this.color < 0) {
            --this.tier;
            this.color = 4;
        }
        if (this.tier < 0) {
            AudioManager.play("brick-hit-1");
            this.inPlay = false;
            return;
        }
        this.setImage(this.color, this.tier);
    }
    update(dt) { }
    draw(ctx) {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
}

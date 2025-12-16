export default class inputHandler {
    downKeys = new Set();
    frameKeys = new Set();
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.downKeys.add(e.code);
            if (!e.repeat) {
                this.frameKeys.add(e.code);
            }
        });
        window.addEventListener("keyup", (e) => {
            this.downKeys.delete(e.code);
        });
    }
    isDown(key) {
        return this.downKeys.has(key);
    }
    wasPressed(key) {
        return this.frameKeys.has(key);
    }
    update() {
        this.frameKeys = new Set();
    }
    reset() {
        this.downKeys = new Set();
        this.frameKeys = new Set();
    }
}

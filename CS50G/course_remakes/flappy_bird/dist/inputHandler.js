// type Event = {
//   x: number;
//   y: number;
// };
// type Events = "mouse";
// type EventHandler = (e: Event) => void;
export default class InputHandler {
    keysDown = new Set();
    frameKeys = new Set();
    _mousePressed = {
        x: 0,
        y: 0,
        pressed: false,
    };
    constructor() {
        window.addEventListener("keydown", (e) => {
            this.keysDown.add(e.code);
            if (!e.repeat) {
                this.frameKeys.add(e.code);
            }
        });
        window.addEventListener("keyup", (e) => {
            this.keysDown.delete(e.code);
        });
        window.addEventListener("mousedown", (e) => {
            this._mousePressed.pressed = true;
            this._mousePressed.x = e.clientX;
            this._mousePressed.y = e.clientY;
        });
        window.addEventListener("mouseup", (e) => {
            this._mousePressed.pressed = false;
        });
    }
    isDown(key) {
        return this.keysDown.has(key);
    }
    wasPressed(key) {
        return this.frameKeys.has(key);
    }
    mousePressed() {
        if (this._mousePressed.pressed) {
            return this._mousePressed;
        }
        else
            return null;
    }
    update() {
        this.frameKeys = new Set();
        this._mousePressed.pressed = false;
    }
    reset() {
        this.keysDown = new Set();
        this.frameKeys = new Set();
        this._mousePressed.pressed = false;
    }
}

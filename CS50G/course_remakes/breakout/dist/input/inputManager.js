import KeyboardManager from "./keyboardManager";
export default class InputManager {
    keyboard = new KeyboardManager();
    _mousePressed = {
        x: 0,
        y: 0,
        pressed: false,
    };
    constructor() {
        window.addEventListener("mousedown", (e) => {
            this._mousePressed.pressed = true;
            this._mousePressed.x = e.clientX;
            this._mousePressed.y = e.clientY;
        });
        window.addEventListener("mouseup", (e) => {
            this._mousePressed.pressed = false;
        });
        window.addEventListener("mouseleave", (e) => {
            this._mousePressed.pressed = false;
        });
    }
    mousePressed() {
        if (this._mousePressed.pressed) {
            return this._mousePressed;
        }
        else
            return null;
    }
    update() {
        this._mousePressed.pressed = false;
    }
    reset() {
        this._mousePressed.pressed = false;
    }
}

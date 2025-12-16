export default class inputHandler {
  private downKeys: Set<string> = new Set();
  private frameKeys: Set<string> = new Set();
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

  isDown(key: string) {
    return this.downKeys.has(key);
  }

  wasPressed(key: string) {
    return this.frameKeys.has(key);
  }

  update(): void {
    this.frameKeys = new Set();
  }

  reset(): void {
    this.downKeys = new Set();
    this.frameKeys = new Set();
  }
}

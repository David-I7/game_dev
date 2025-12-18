import State from "./state.js";

export default class StartState implements State {
  constructor() {}

  draw(ctx: CanvasRenderingContext2D): void {}

  update(dt: number): void {}

  enter(enterParams?: Record<string, any>): void {}
  exit(): void {}
}

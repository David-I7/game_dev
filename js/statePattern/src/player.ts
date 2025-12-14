import InputHandler from "./input.js";
import Shape from "./shape.js";
import {
  AttackDownLeft,
  AttackDownRight,
  FallingLeft,
  FallingRight,
  JumpingLeft,
  JumpingRight,
  RunningLeft,
  RunningRight,
  SittingLeft,
  SittingRight,
  StandingLeft,
  StandingRight,
  State,
  States,
} from "./state.js";

export default class Player implements Shape {
  image: HTMLImageElement = document.getElementById(
    "dogImage"
  ) as HTMLImageElement;
  x: number = 0;
  y: number = 0;
  width: number = this.image.width / 9;
  height: number = this.image.height / 12;
  states: State[] = [
    new StandingRight(this),
    new StandingLeft(this),
    new SittingRight(this),
    new SittingLeft(this),
    new JumpingRight(this),
    new JumpingLeft(this),
    new FallingRight(this),
    new FallingLeft(this),
    new AttackDownRight(this),
    new AttackDownLeft(this),
    new RunningRight(this),
    new RunningLeft(this),
  ];
  currentState: State = this.states[0];
  frameX: number = 0;
  frameY: number = 0;
  maxFrameX: number = 7;
  vy: number = 0;
  vx: number = 0;
  gravity: number = 4;
  frameInterval: number = 1000 / 30;
  frameTimer = 0;

  constructor(public gameWidth: number, public gameHeight: number) {
    this.x = gameWidth / 2 - this.width / 2;
    this.y = gameHeight - this.height;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.drawImage(
      this.image,
      this.frameX * this.width,
      this.frameY * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }

  update(input: InputHandler, delta: number) {
    // state
    this.currentState.handleInput(input);

    // frame animation
    this.frameTimer += delta;
    if (this.frameTimer >= this.frameInterval) {
      this.frameX = (this.frameX + 1) % this.maxFrameX;
      this.frameTimer = 0;
    }

    // horizontal movement
    this.x = Math.min(
      Math.max(this.x + this.vx, 0),
      this.gameWidth - this.width
    );

    // vertical movement
    this.y = Math.min(this.vy + this.y, this.gameHeight - this.height);
    if (!this.onGround()) {
      this.vy += this.gravity;
    } else {
      this.vy = 0;
    }
  }

  setState(state: States) {
    this.currentState = this.states[state];
    this.currentState.enter();
  }
  onGround() {
    return this.y >= this.gameHeight - this.height;
  }
}

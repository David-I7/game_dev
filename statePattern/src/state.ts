import InputHandler from "./input.js";
import Player from "./player.js";

export abstract class State {
  constructor(public stateName: string) {}
  abstract enter(): void;
  abstract handleInput(input: InputHandler): void;
}

export enum States {
  STANDING_RIGHT,
  STANDING_LEFT,

  SITTING_RIGHT,
  SITTING_LEFT,

  JUMPING_RIGHT,
  JUMPING_LEFT,

  FALLING_RIGHT,
  FALLING_LEFT,

  ATTACK_DOWN_RIGHT,
  ATTACK_DOWN_LEFT,

  RUNNING_RIGHT,
  RUNNING_LEFT,
}

export class StandingRight extends State {
  constructor(public player: Player) {
    super(States[0]);
  }

  enter(): void {
    this.player.frameY = 0;
    this.player.vx = 0;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS left") {
      this.player.setState(States["STANDING_LEFT"]);
    } else if (input.lastKey == "PRESS down") {
      this.player.setState(States["SITTING_RIGHT"]);
    } else if (input.lastKey == "PRESS up") {
      this.player.setState(States["JUMPING_RIGHT"]);
    } else if (input.lastKey == "PRESS right") {
      this.player.setState(States["RUNNING_RIGHT"]);
    }
  }
}
export class StandingLeft extends State {
  constructor(public player: Player) {
    super(States[1]);
  }

  enter(): void {
    this.player.frameY = 1;
    this.player.vx = 0;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS right") {
      this.player.setState(States["STANDING_RIGHT"]);
    } else if (input.lastKey == "PRESS down") {
      this.player.setState(States["SITTING_LEFT"]);
    } else if (input.lastKey == "PRESS up") {
      this.player.setState(States["JUMPING_LEFT"]);
    } else if (input.lastKey == "PRESS left") {
      this.player.setState(States["RUNNING_LEFT"]);
    }
  }
}
export class SittingRight extends State {
  constructor(public player: Player) {
    super(States[2]);
  }

  enter(): void {
    this.player.frameY = 8;
    this.player.maxFrameX = 5;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "RELEASE down") {
      this.player.setState(States["STANDING_RIGHT"]);
    } else if (input.lastKey == "PRESS left") {
      this.player.setState(States["SITTING_LEFT"]);
    }
  }
}
export class SittingLeft extends State {
  constructor(public player: Player) {
    super(States[3]);
  }

  enter(): void {
    this.player.frameY = 9;
    this.player.maxFrameX = 5;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "RELEASE down") {
      this.player.setState(States["STANDING_LEFT"]);
    } else if (input.lastKey == "PRESS right") {
      this.player.setState(States["SITTING_RIGHT"]);
    }
  }
}
export class JumpingRight extends State {
  constructor(public player: Player) {
    super(States[4]);
  }

  enter(): void {
    this.player.frameY = 2;
    this.player.maxFrameX = 7;
    if (this.player.onGround()) this.player.vy = -50;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS down") {
      this.player.setState(States["ATTACK_DOWN_RIGHT"]);
    } else if (this.player.vy >= 0) {
      this.player.setState(States["FALLING_RIGHT"]);
    } else if (input.lastKey == "PRESS left") {
      this.player.setState(States["JUMPING_LEFT"]);
    }
  }
}
export class JumpingLeft extends State {
  constructor(public player: Player) {
    super(States[5]);
  }

  enter(): void {
    this.player.frameY = 3;
    this.player.maxFrameX = 7;
    if (this.player.onGround()) this.player.vy = -50;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS down") {
      this.player.setState(States["ATTACK_DOWN_LEFT"]);
    } else if (this.player.vy >= 0) {
      this.player.setState(States["FALLING_LEFT"]);
    } else if (input.lastKey == "PRESS right") {
      this.player.setState(States["JUMPING_RIGHT"]);
    }
  }
}
export class FallingRight extends State {
  constructor(public player: Player) {
    super(States[6]);
  }

  enter(): void {
    this.player.frameY = 4;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS down") {
      this.player.setState(States["ATTACK_DOWN_RIGHT"]);
    } else if (this.player.onGround()) {
      this.player.setState(States["STANDING_RIGHT"]);
    } else if (input.lastKey == "PRESS left") {
      this.player.setState(States["FALLING_LEFT"]);
    }
  }
}
export class FallingLeft extends State {
  constructor(public player: Player) {
    super(States[7]);
  }

  enter(): void {
    this.player.frameY = 5;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "PRESS down") {
      this.player.setState(States["ATTACK_DOWN_LEFT"]);
    } else if (this.player.onGround()) {
      this.player.setState(States["STANDING_LEFT"]);
    } else if (input.lastKey == "PRESS right") {
      this.player.setState(States["FALLING_RIGHT"]);
    }
  }
}
export class AttackDownRight extends State {
  constructor(public player: Player) {
    super(States[8]);
  }

  enter(): void {
    this.player.frameY = 10;
    this.player.gravity += 50;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (this.player.onGround()) {
      this.player.gravity -= 50;
      this.player.setState(States["STANDING_RIGHT"]);
    }
  }
}
export class AttackDownLeft extends State {
  constructor(public player: Player) {
    super(States[9]);
  }

  enter(): void {
    this.player.frameY = 11;
    this.player.gravity += 50;
    this.player.maxFrameX = 7;
  }
  handleInput(input: InputHandler): void {
    if (this.player.onGround()) {
      this.player.gravity -= 50;
      this.player.setState(States["STANDING_LEFT"]);
    }
  }
}
export class RunningRight extends State {
  constructor(public player: Player) {
    super(States[10]);
  }

  enter(): void {
    this.player.frameY = 6;
    this.player.vx = 5;
    this.player.maxFrameX = 9;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "RELEASE right") {
      this.player.setState(States["STANDING_RIGHT"]);
    } else if (input.lastKey == "PRESS down") {
      this.player.setState(States["SITTING_RIGHT"]);
    } else if (input.lastKey == "PRESS up") {
      this.player.setState(States["JUMPING_RIGHT"]);
    }
  }
}
export class RunningLeft extends State {
  constructor(public player: Player) {
    super(States[11]);
  }

  enter(): void {
    this.player.frameY = 7;
    this.player.maxFrameX = 9;
    this.player.vx = -5;
  }
  handleInput(input: InputHandler): void {
    if (input.lastKey == "RELEASE left") {
      this.player.setState(States["STANDING_LEFT"]);
    } else if (input.lastKey == "PRESS down") {
      this.player.setState(States["SITTING_LEFT"]);
    } else if (input.lastKey == "PRESS up") {
      this.player.setState(States["JUMPING_LEFT"]);
    }
  }
}

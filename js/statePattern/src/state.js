export class State {
    stateName;
    constructor(stateName) {
        this.stateName = stateName;
    }
}
export var States;
(function (States) {
    States[States["STANDING_RIGHT"] = 0] = "STANDING_RIGHT";
    States[States["STANDING_LEFT"] = 1] = "STANDING_LEFT";
    States[States["SITTING_RIGHT"] = 2] = "SITTING_RIGHT";
    States[States["SITTING_LEFT"] = 3] = "SITTING_LEFT";
    States[States["JUMPING_RIGHT"] = 4] = "JUMPING_RIGHT";
    States[States["JUMPING_LEFT"] = 5] = "JUMPING_LEFT";
    States[States["FALLING_RIGHT"] = 6] = "FALLING_RIGHT";
    States[States["FALLING_LEFT"] = 7] = "FALLING_LEFT";
    States[States["ATTACK_DOWN_RIGHT"] = 8] = "ATTACK_DOWN_RIGHT";
    States[States["ATTACK_DOWN_LEFT"] = 9] = "ATTACK_DOWN_LEFT";
    States[States["RUNNING_RIGHT"] = 10] = "RUNNING_RIGHT";
    States[States["RUNNING_LEFT"] = 11] = "RUNNING_LEFT";
})(States || (States = {}));
export class StandingRight extends State {
    player;
    constructor(player) {
        super(States[0]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 0;
        this.player.vx = 0;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS left") {
            this.player.setState(States["STANDING_LEFT"]);
        }
        else if (input.lastKey == "PRESS down") {
            this.player.setState(States["SITTING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS up") {
            this.player.setState(States["JUMPING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS right") {
            this.player.setState(States["RUNNING_RIGHT"]);
        }
    }
}
export class StandingLeft extends State {
    player;
    constructor(player) {
        super(States[1]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 1;
        this.player.vx = 0;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS right") {
            this.player.setState(States["STANDING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS down") {
            this.player.setState(States["SITTING_LEFT"]);
        }
        else if (input.lastKey == "PRESS up") {
            this.player.setState(States["JUMPING_LEFT"]);
        }
        else if (input.lastKey == "PRESS left") {
            this.player.setState(States["RUNNING_LEFT"]);
        }
    }
}
export class SittingRight extends State {
    player;
    constructor(player) {
        super(States[2]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 8;
        this.player.maxFrameX = 5;
    }
    handleInput(input) {
        if (input.lastKey == "RELEASE down") {
            this.player.setState(States["STANDING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS left") {
            this.player.setState(States["SITTING_LEFT"]);
        }
    }
}
export class SittingLeft extends State {
    player;
    constructor(player) {
        super(States[3]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 9;
        this.player.maxFrameX = 5;
    }
    handleInput(input) {
        if (input.lastKey == "RELEASE down") {
            this.player.setState(States["STANDING_LEFT"]);
        }
        else if (input.lastKey == "PRESS right") {
            this.player.setState(States["SITTING_RIGHT"]);
        }
    }
}
export class JumpingRight extends State {
    player;
    constructor(player) {
        super(States[4]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 2;
        this.player.maxFrameX = 7;
        if (this.player.onGround())
            this.player.vy = -50;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS down") {
            this.player.setState(States["ATTACK_DOWN_RIGHT"]);
        }
        else if (this.player.vy >= 0) {
            this.player.setState(States["FALLING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS left") {
            this.player.setState(States["JUMPING_LEFT"]);
        }
    }
}
export class JumpingLeft extends State {
    player;
    constructor(player) {
        super(States[5]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 3;
        this.player.maxFrameX = 7;
        if (this.player.onGround())
            this.player.vy = -50;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS down") {
            this.player.setState(States["ATTACK_DOWN_LEFT"]);
        }
        else if (this.player.vy >= 0) {
            this.player.setState(States["FALLING_LEFT"]);
        }
        else if (input.lastKey == "PRESS right") {
            this.player.setState(States["JUMPING_RIGHT"]);
        }
    }
}
export class FallingRight extends State {
    player;
    constructor(player) {
        super(States[6]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 4;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS down") {
            this.player.setState(States["ATTACK_DOWN_RIGHT"]);
        }
        else if (this.player.onGround()) {
            this.player.setState(States["STANDING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS left") {
            this.player.setState(States["FALLING_LEFT"]);
        }
    }
}
export class FallingLeft extends State {
    player;
    constructor(player) {
        super(States[7]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 5;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (input.lastKey == "PRESS down") {
            this.player.setState(States["ATTACK_DOWN_LEFT"]);
        }
        else if (this.player.onGround()) {
            this.player.setState(States["STANDING_LEFT"]);
        }
        else if (input.lastKey == "PRESS right") {
            this.player.setState(States["FALLING_RIGHT"]);
        }
    }
}
export class AttackDownRight extends State {
    player;
    constructor(player) {
        super(States[8]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 10;
        this.player.gravity += 50;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.gravity -= 50;
            this.player.setState(States["STANDING_RIGHT"]);
        }
    }
}
export class AttackDownLeft extends State {
    player;
    constructor(player) {
        super(States[9]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 11;
        this.player.gravity += 50;
        this.player.maxFrameX = 7;
    }
    handleInput(input) {
        if (this.player.onGround()) {
            this.player.gravity -= 50;
            this.player.setState(States["STANDING_LEFT"]);
        }
    }
}
export class RunningRight extends State {
    player;
    constructor(player) {
        super(States[10]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 6;
        this.player.vx = 5;
        this.player.maxFrameX = 9;
    }
    handleInput(input) {
        if (input.lastKey == "RELEASE right") {
            this.player.setState(States["STANDING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS down") {
            this.player.setState(States["SITTING_RIGHT"]);
        }
        else if (input.lastKey == "PRESS up") {
            this.player.setState(States["JUMPING_RIGHT"]);
        }
    }
}
export class RunningLeft extends State {
    player;
    constructor(player) {
        super(States[11]);
        this.player = player;
    }
    enter() {
        this.player.frameY = 7;
        this.player.maxFrameX = 9;
        this.player.vx = -5;
    }
    handleInput(input) {
        if (input.lastKey == "RELEASE left") {
            this.player.setState(States["STANDING_LEFT"]);
        }
        else if (input.lastKey == "PRESS down") {
            this.player.setState(States["SITTING_LEFT"]);
        }
        else if (input.lastKey == "PRESS up") {
            this.player.setState(States["JUMPING_LEFT"]);
        }
    }
}

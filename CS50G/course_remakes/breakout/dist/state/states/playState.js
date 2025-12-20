import { AABBColides, ResourceManager } from "../../dependencies.js";
import { randInt } from "../../utils/random.js";
export class PlayState {
    levelState = null;
    enter(enterParams) {
        this.levelState = enterParams;
        this.levelState.ball.vx = randInt(-200, 200);
        this.levelState.ball.vy = randInt(-50, -60);
    }
    exit() { }
    draw(ctx) {
        this.levelState?.paddle.draw(ctx);
        this.levelState?.ball.draw(ctx);
        this.levelState?.bricks.forEach((brick) => {
            if (brick.inPlay)
                brick.draw(ctx);
        });
    }
    update(dt) {
        const ball = this.levelState.ball;
        const paddle = this.levelState.paddle;
        paddle.update(dt);
        ball.update(dt);
        if (AABBColides(ball, paddle)) {
            ball.y = paddle.y - ball.height;
            ball.vy *= -1;
            if (ball.x < paddle.x + paddle.width / 2 && paddle.vx < 0) {
                ball.vx = -50 + -(8 * paddle.x + paddle.width / 2 - ball.x);
            }
            else if (ball.x > paddle.x + paddle.width / 2 && paddle.vx > 0) {
                ball.vx = -50 + 8 * Math.abs(paddle.x + paddle.width / 2 - ball.x);
            }
            ResourceManager.sounds["paddle-hit"].play();
        }
        this.levelState?.bricks.forEach((brick) => {
            if (brick.inPlay && AABBColides(ball, brick)) {
                brick.hit();
            }
        });
    }
}

import EmptyState from "./states/empty.js";
import { HighScoreState } from "./states/highScoreState.js";
import { PaddleSelect } from "./states/paddleSelect.js";
import { PlayState } from "./states/playState.js";
import { ServerState } from "./states/serveState.js";
import { StartState } from "./states/startState.js";
class StateMachine {
    states;
    static empty = new EmptyState();
    current = StateMachine.empty;
    constructor(states) {
        this.states = states;
    }
    change(stateName, enterParams) {
        if (!(stateName in this.states))
            return;
        this.current.exit();
        this.current = this.states[stateName];
        this.current.enter(enterParams);
    }
    update(dt) {
        this.current.update(dt);
    }
    draw(ctx) {
        this.current.draw(ctx);
    }
}
export const gStateMachine = new StateMachine({
    start: new StartState(),
    play: new PlayState(),
    paddleSelect: new PaddleSelect(),
    highScore: new HighScoreState(),
    setHighScore: new EmptyState(),
    serve: new ServerState(),
});

import EmptyState from "./states/empty.js";
import { PaddleSelect } from "./states/paddleSelect.js";
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
    play: new EmptyState(),
    paddleSelect: new PaddleSelect(),
    highScore: new EmptyState(),
});

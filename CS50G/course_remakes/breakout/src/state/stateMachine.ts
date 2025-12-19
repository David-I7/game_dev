import EmptyState from "./states/empty.js";
import { PaddleSelect } from "./states/paddleSelect.js";
import { StartState } from "./states/startState.js";
import State from "./states/state.js";

type States = "play" | "start" | "paddleSelect" | "highScore";

class StateMachine {
  private static empty: State = new EmptyState();
  private current: State = StateMachine.empty;

  constructor(private states: Record<States, State>) {}

  change(
    stateName: keyof typeof this.states,
    enterParams?: Record<string, any>
  ) {
    if (!(stateName in this.states)) return;
    this.current.exit();
    this.current = this.states[stateName];
    this.current.enter(enterParams);
  }

  update(dt: number) {
    this.current.update(dt);
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.current.draw(ctx);
  }
}

export const gStateMachine = new StateMachine({
  start: new StartState(),
  play: new EmptyState(),
  paddleSelect: new PaddleSelect(),
  highScore: new EmptyState(),
});

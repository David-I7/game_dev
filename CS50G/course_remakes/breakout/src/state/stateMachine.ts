import EmptyState from "./states/empty.js";
import State from "./states/state.js";

export class StateMachine {
  private static empty: State = new EmptyState();
  private current: State = StateMachine.empty;

  constructor(private states: Record<string, State>) {}

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

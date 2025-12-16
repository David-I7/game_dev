import Game from "./game.js";
import inputHandler from "./inputHandler.js";
import { StateMachine } from "./stateMachine.js";
import CountdownState from "./states/countdown.js";
import PlayState from "./states/play.js";
import ScoreState from "./states/score.js";
import TitleScreenState from "./states/title.js";

export const gInputHandler = new inputHandler();
export const gGame = new Game(window.innerWidth, window.innerHeight);
export const gStateMachine = new StateMachine({
  title: new TitleScreenState(),
  countdown: new CountdownState(),
  play: new PlayState(),
  score: new ScoreState(),
});
const GLOBALS = {
  gInputHandler,
  gStateMachine,
  gGame,
};

export default GLOBALS;

import Game from "./game.js";
import InputHandler from "./inputHandler.js";
import { StateMachine } from "./stateMachine.js";
import CountdownState from "./states/countdown.js";
import PauseState from "./states/pauseState.js";
import PlayState from "./states/play.js";
import ScoreState from "./states/score.js";
import TitleScreenState from "./states/title.js";
export const gInputHandler = new InputHandler();
export const gGame = new Game(window.innerWidth, window.innerHeight);
export const gStateMachine = new StateMachine({
    title: new TitleScreenState(),
    countdown: new CountdownState(),
    play: new PlayState(),
    score: new ScoreState(),
    paused: new PauseState(),
});
export const gSounds = {
    jump: new Audio("../assets/sounds/jump.wav"),
    hurt: new Audio("../assets/sounds/hurt.wav"),
    explosion: new Audio("../assets/sounds/explosion.wav"),
    score: new Audio("../assets/sounds/score.wav"),
    marios_way: new Audio("../assets/sounds/marios_way.mp3"),
};
gSounds.marios_way.loop = true;
const GLOBALS = {
    gInputHandler,
    gStateMachine,
    gGame,
    gSounds,
};
export default GLOBALS;

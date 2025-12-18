export const gSounds = {
  "paddle-hit": document.getElementById("paddle-hit") as HTMLAudioElement,
  score: document.getElementById("score") as HTMLAudioElement,
  "wall-hit": document.getElementById("wall-hit") as HTMLAudioElement,
  confirm: document.getElementById("confirm") as HTMLAudioElement,
  select: document.getElementById("select") as HTMLAudioElement,
  "no-select": document.getElementById("no-select") as HTMLAudioElement,
  "brick-hit-1": document.getElementById("brick-hit-1") as HTMLAudioElement,
  "brick-hit-2": document.getElementById("brick-hit-2") as HTMLAudioElement,
  hurt: document.getElementById("hurt") as HTMLAudioElement,
  victory: document.getElementById("victory") as HTMLAudioElement,
  recover: document.getElementById("recover") as HTMLAudioElement,
  "high-score": document.getElementById("high-score") as HTMLAudioElement,
  pause: document.getElementById("pause") as HTMLAudioElement,

  music: document.getElementById("music") as HTMLAudioElement,
};

export default {
  gSounds,
};

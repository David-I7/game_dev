export type HighScore = {
  name: string;
  score: string;
};

export class HighScoreManger {
  private static highScores: HighScore[] = [
    { name: "AaB", score: "100000" },
    { name: "aaa", score: "999" },
    { name: "fef", score: "900" },
    { name: "AaB", score: "800" },
    { name: "AaB", score: "700" },
    { name: "AaB", score: "600" },
    { name: "AaB", score: "500" },
    { name: "AaB", score: "400" },
    { name: "AaB", score: "300" },
    { name: "AaB", score: "99" },
  ];

  static get() {
    if (HighScoreManger.highScores == undefined) {
      HighScoreManger.load();
    }
    return HighScoreManger.highScores;
  }

  static set(highScore: HighScore, i: number) {
    if (i >= 10 || i < 0) return;
    if (i == HighScoreManger.length) {
      HighScoreManger.highScores.push(highScore);
    } else HighScoreManger.highScores.splice(i, 1, highScore);

    HighScoreManger.save();
  }

  private static save() {
    window.localStorage.setItem(
      "highScore",
      JSON.stringify(HighScoreManger.highScores)
    );
  }

  private static load() {
    const data = window.localStorage.getItem("highScores");

    if (data != null) {
      try {
        HighScoreManger.highScores = JSON.parse(data);
      } catch (err) {
        HighScoreManger.highScores = [];
      }
    } else {
      HighScoreManger.highScores = [];
    }
  }
}

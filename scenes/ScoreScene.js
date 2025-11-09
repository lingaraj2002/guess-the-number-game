import { Text, Button } from "../utils/helpers.js";

// Game Score Scene
export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super("score");
  }

  // Receive & Set The Score Value
  init(data) {
    this.score = parseInt(data.score) || 1;
  }

  preload() {
    this.load.image("btn", "assets/images/btn.png");
  }

  create() {
    // Destructure The Game Canvas Width & Height
    const { width, height } = this.scale;

    // Your Score Text
    Text(this, width / 2, height / 6, "Your score", "32px");

    // Score Value Text
    Text(this, width / 2, height / 2.5, this.score, "192px");

    // Go HomeBtn
    Button(this, width / 2, height / 1.5, "btn", "Go HOME", "16px", () => {
      this.scene.start("home");
    });
  }
}

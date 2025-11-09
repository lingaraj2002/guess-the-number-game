import AudioManager from "../utils/AudioManager.js";
import { Text, Button } from "../utils/helpers.js";

// Home Screen Scene
export default class HomeScene extends Phaser.Scene {
  constructor() {
    super("home");
  }

  preload() {
    // Load The Assets
    this.load.image("btn", "assets/images/btn.png");
    this.load.audio("bgm", "assets/audio/bgm.mp3");
  }

  create() {
    // Destructured The Game Width & Height
    const { width, height } = this.scale;

    // Play Bgm When Game Is Started
    AudioManager.playBgm(this);

    // Game Name Text
    Text(this, width / 2, height / 2.5, "GUESS \nTHE \nNUMBER", "64px");

    // Btn For Start The Game
    Button(this, width / 2, height / 1.5, "btn", "PLAY GAME", "16px", () => {
      this.scene.start("board");
    });
  }
}

import HomeScene from "./scenes/HomeScene.js";
import BoardScene from "./scenes/BoardScene.js";
import ScoreScene from "./scenes/ScoreScene.js";

// Canvas Size Setup
const baseHeight = window.innerHeight;
const baseWidth = baseHeight * (9 / 16);

// Game Config Setup
const config = {
  type: Phaser.AUTO,
  width: baseWidth,
  height: baseHeight - 7,
  backgroundColor: "#9bbc0f",
  scale: {
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  scene: [HomeScene, BoardScene, ScoreScene],
};

new Phaser.Game(config);

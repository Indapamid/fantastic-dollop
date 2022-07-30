import Phaser from "phaser";
import GameScene from "./scenes/GameScene";

const config = {
  type: Phaser.AUTO,
  width: 360,
  height: 768,
  scene: [GameScene],
  backgroundColor: "#dedede",
};

export default new Phaser.Game(config);

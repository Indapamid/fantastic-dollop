import Phaser from 'phaser';

export default class Lines extends Phaser.GameObjects.Sprite {
  constructor(scene, position) {
    super(scene, position.x, position.y, `${position.img}`);
    this.scene = scene;
    this.position = position;
    this.scene.add.existing(this);
    this.setInteractive();
    this.on("pointerdown", this.rotationLine, this);
    this.angle = position.turn;
  }

  rotationLine() {
    
    this.position.turn += 90;
    this.angle = this.position.turn;
    console.log(this.position.turn);
    if (this.position.turn >= 360) {
      this.position.turn = 0;
    }
  }
}

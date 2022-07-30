import Phaser from "phaser";

export default class Lines extends Phaser.GameObjects.Sprite {
  constructor(scene, position, reference) {
    super(scene, position.x, position.y, `${position.img}`);
    this.scene = scene;
    this.reference = reference;
    this.position = position;
    this.scene.add.existing(this);
    this.setInteractive();
    this.on("pointerdown", this.rotationLine, this);
    this.angle = position.turn;
  }

  rotationLine() {
    console.log(this.scene.lines);
    this.position.turn += 90;
    this.angle = this.position.turn;
    if (this.position.turn >= 360) {
      this.position.turn = 0;
    }
    console.log(this.reference);
    let numElref = 0;
    this.reference.forEach((el) => {
      if (el.bool) {
        numElref += 1;
      }
    });
    console.log(numElref);
    let numEl = 0;
    this.scene.lines.forEach((el, index) => {
      // if(this.reference[index].img == 'line'){
      //   if(el._displayOriginX == this.reference[index].x && el._displayOriginY == this.reference[index].y && this.reference[index].bool ){
      //     if(el.position.turn == this.reference[index].turn || el.position.turn == this.reference[index].turn+180 )
      //     numEl+=1
      //   }
      // }else if(el._displayOriginX == this.reference[index].x && el._displayOriginY == this.reference[index].y && el.position.turn == this.reference[index].turn && this.reference[index].bool ){
      //   numEl+=1
      // }

      if (this.reference[index].bool && this.reference[index].img == "line") {
        if (
          el.position.turn == this.reference[index].turn ||
          el.position.turn == this.reference[index].turn + 180
        ) {
          numEl += 1;
        }
      } else if (
        this.reference[index].img != "line" &&
        el.position.turn == this.reference[index].turn &&
        this.reference[index].bool
      ) {
        numEl += 1;
      }
    });
    console.log(numEl);
    if (numEl == numElref) {
      console.log("true");
    }
  }
  // this.scoreText = this.add.text(16, 16, "score: 0", {
  //   fontSize: "32px",
  //   fill: "#000",
  // });
  // this.scoreText.setText("Score:" + this.score);
}

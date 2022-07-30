import Phaser from "phaser";
import Lines from "../sprites/Lines";
import { Button } from "../sprites/Button";

export default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    let xhr = new XMLHttpRequest();

    let body_data = JSON.stringify({
      difficulty: "easy",
    });

    xhr.open(
      "POST",
      "https://es44wtsfdvbnc.elma365.ru/api/extensions/b1e9ad10-7c90-4758-88c8-48f5605d3ea4/script/create_game",
      false
    );

    xhr.setRequestHeader(
      "Authorization",
      "Bearer 3bff3123-17a2-407a-bcdb-f25a0291bbea"
    );

    xhr.send(body_data);

    xhr.onload = function () {
      if (xhr.status !== 200) {
        alert("Error: " + xhr.status);
        return;
      }
    };

    this.response = JSON.parse("[" + xhr.response + "]")[0];

    this.load.spritesheet("buttonTaskInfo", "assets/image/button.png", {
      frameWidth: 193,
      frameHeight: 71,
    });
    this.load.image("background", "assets/image/background.png");
    this.load.image("start", "assets/image/start.png");
    this.load.image("task", "assets/image/task.png");
    this.load.image("operation", "assets/image/operation.png");
    this.load.image("script", "assets/image/script.png");
    this.load.image("if", "assets/image/if.png");
    this.load.image("line", "assets/image/line.png");
    this.load.image("angle", "assets/image/ellipse.png");
    this.load.image("end", "assets/image/end.png");
    this.load.image("low_line", "assets/image/shortLIne.png");
    this.load.image("t_angle", "assets/image/lineT.png");

    this.load.audio("pop", "assets/sound/sound_pop.aiff");
  }

  create() {
    this.createSounds();
    this.createLines();
    this.createBlock();

    let btn1 = new Button(
      this,
      this.sys.canvas.width - 60,
      720,
      "buttonTaskInfo",
      this.actionOnClick,
      2,
      1,
      0
    );
    btn1.setOrigin(0);
  }
  // actionOnClick() {
  //   let numElref = 0;
  //   positionsLines.truePositions.forEach((el) => {
  //     if (el.bool) {
  //       numElref += 1;
  //     }
  //   });
  //   console.log(numElref);
  //   let numEl = 0;
  //   this.scene.lines.forEach((el, index) => {
  //     if (
  //       positionsLines.truePositions[index].bool &&
  //       positionsLines.truePositions[index].img == "line"
  //     ) {
  //       if (
  //         el.position.turn == positionsLines.truePositions[index].turn ||
  //         el.position.turn == positionsLines.truePositions[index].turn + 180
  //       ) {
  //         numEl += 1;
  //       }
  //     } else if (
  //       positionsLines.truePositions[index].img != "line" &&
  //       el.position.turn == positionsLines.truePositions[index].turn &&
  //       positionsLines.truePositions[index].bool
  //     ) {
  //       numEl += 1;
  //     }
  //   });
  //   console.log(numEl);
  //   if (numEl == numElref) {
  //     this.scoreText = this.add.text(16, 16, "score: 0", {
  //       fontSize: "32px",
  //     });
  //   }
  // }
  createSounds() {
    // this.sounds={
    //   pop:this.sound.add("pop")
    // }
    // this.sounds.pop.play()
  }

  createLines() {
    this.lines = [];
    let positionsLines = this.getLinesPositions();

    for (let position of positionsLines.positions) {
      this.lines.push(new Lines(this, position, positionsLines.truePositions));
      // this.add.sprite(position.x, position.y, `${position.img}`);
    }
  }

  createBlock() {
    let positionsBlocks = this.getBlocksPositions();

    for (let position of positionsBlocks) {
      this.add.sprite(position.x, position.y, `${position.img}`);
    }
  }

  getLinesPositions() {
    let linePositions = {
      positions: [],
      truePositions: [],
    };

    this.response.main_body.forEach((str, indexStr) => {
      str.forEach((el, index) => {
        if (el.line != null) {
          let pos = {
            x: index * 120 + 60,
            y: indexStr * 120 + 60,
            img: `${el.line}`,
            turn: el.direction[0],
            bool: true,
          };
          linePositions.truePositions.push(pos);
        }
      });
    });

    this.response.fake_body.forEach((str, indexStr) => {
      str.forEach((el, index) => {
        if (el.line != null) {
          let pos = {
            x: index * 120 + 60,
            y: indexStr * 120 + 60,
            img: `${el.line}`,
            turn: "",
            bool: false,
          };
          linePositions.truePositions.push(pos);
        }
      });
    });

    console.log(linePositions);
    this.response.main_body.forEach((str, indexStr) => {
      str.forEach((el, index) => {
        if (el.line != null) {
          let num = 0;
          if (el.line == "line") {
            num = 2;
          } else {
            num = 4;
          }
          let numR = Math.ceil(Math.random() * num);
          if (numR == 4) {
            numR = 0;
          }
          let pos = {
            x: index * 120 + 60,
            y: indexStr * 120 + 60,
            img: `${el.line}`,
            turn: numR * 90,
          };
          linePositions.positions.push(pos);
        }
      });
    });
    this.response.fake_body.forEach((str, indexStr) => {
      str.forEach((el, index) => {
        if (el.line != null) {
          let num = Math.ceil(Math.random() * 4);
          let pos = {
            x: index * 120 + 60,
            y: indexStr * 120 + 60,
            img: `${el.line}`,
            turn: num * 90,
          };
          linePositions.positions.push(pos);
        }
      });
    });

    return linePositions;
  }

  getBlocksPositions() {
    let positions = [];
    this.response.main_body.forEach((str, indexStr) => {
      str.forEach((el, index) => {
        if (el.block != null) {
          let pos = {
            x: index * 120 + 60,
            y: indexStr * 120 + 60,
            img: `${el.block}`,
          };
          positions.push(pos);
        }
      });
    });

    return positions;
  }
  update() {}
}

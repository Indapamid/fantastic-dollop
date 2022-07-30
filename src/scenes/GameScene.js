import Phaser from "phaser";
import Lines from "../sprites/Lines";
import {Button} from "../sprites/Button";

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

    this.load.spritesheet('buttonTaskInfo', 'assets/image/button.png', { frameWidth: 193, frameHeight: 71 })
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

    let btn1 = new Button(this, this.sys.canvas.width - 90, 40, 'buttonTaskInfo', this.actionOnClick, 2, 1, 0);
    btn1.setOrigin(0);

  }

  createSounds() {
    // this.sounds={
    //   pop:this.sound.add("pop")
    // }
    // this.sounds.pop.play()
  }

  createLines() {
    this.lines = [];
    let positionsLines = this.getLinesPositions();

    for (let position of positionsLines) {
      this.lines.push(new Lines(this, position));
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
    // let positions = [
    //   { x: 60, y: 60, img: "shortLIne", turn: 0 },
    //   { x: 180, y: 180, img: "line", turn: 0 },
    //   { x: 300, y: 60, img: "ellipse", turn: 0 },
    //   { x: 60, y: 300, img: "line", turn: 0 },
    //   { x: 180, y: 420, img: "line", turn: 0 },
    //   { x: 300, y: 300, img: "line", turn: 0 },
    //   { x: 60, y: 540, img: "line", turn: 0 },
    //   { x: 180, y: 660, img: "shortLIne", turn: 0 },
    //   { x: 300, y: 540, img: "line", turn: 0 },
    //   { x: 180, y: 60, img: "lineT", turn: 0 },
    //   { x: 60, y: 180, img: "lineT", turn: 90 },
    //   { x: 180, y: 300, img: "ellipse", turn: 180 },
    //   { x: 300, y: 420, img: "ellipse", turn: 0 },
    //   { x: 60, y: 420, img: "lineT", turn: 270 },
    //   { x: 180, y: 540, img: "ellipse", turn: 90 },
    //   { x: 300, y: 660, img: "ellipse", turn: 180 },
    //   { x: 60, y: 660, img: "lineT", turn: 270 },
    //   { x: 300, y: 180, img: "ellipse", turn: 90 },
    // ];
    let positions = [];
    // this.response.forEach((str, indexStr) => {
    //   str.forEach((el, index) => {
    //     if (el.line != null) {
    //       let pos = {
    //         x: index * 120 + 60,
    //         y: indexStr * 120 + 60,
    //         img: `${el.line}`,
    //         turn: el.direction[0],
    //       };
    //       positions.push(pos);
    //     }
    //   });
    // });

    return positions;
  }

  getBlocksPositions() {
    // let positions = [
    //   { x: 180, y: 180, img: "task" },
    //   { x: 300, y: 60, img: "operation" },
    //   { x: 60, y: 300, img: "if" },
    //   { x: 180, y: 420, img: "script" },
    //   { x: 300, y: 300, img: "script" },
    //   { x: 60, y: 540, img: "operation" },
    //   { x: 300, y: 540, img: "task" },
    // ];

    // let img = [
    //   "task",
    //   "operation",
    //   "if",
    //   "script",
    //   "script",
    //   "operation",
    //   "task",
    // ];
    // Phaser.Utils.Array.Shuffle(img);

    // positions.forEach((element, i) => {
    //   element.img = img[i];
    // });

    // let defaultEl = [
    //   { x: 60, y: 60, img: "start" },
    //   { x: 180, y: 660, img: "end" },
    // ];

    // positions = positions.concat(defaultEl);

    let positions = [];
    // this.response.forEach((str, indexStr) => {
    //   str.forEach((el, index) => {
    //     if (el.block != null) {
    //       let pos = {
    //         x: index * 120 + 60,
    //         y: indexStr * 120 + 60,
    //         img: `${el.block}`,
    //         turn: el.directio,
    //       };
    //       positions.push(pos);
    //     }
    //   });
    // });

    return positions;
  }
}

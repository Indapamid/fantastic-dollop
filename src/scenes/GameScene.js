import Phaser from 'phaser';
import Lines from "../sprites/Lines";

export  default class GameScene extends Phaser.Scene {
  constructor() {
    super("Game");
  }
  preload() {
    this.load.image("background", "assets/background.png");
    this.load.image("start", "assets/start.png");
    this.load.image("task", "assets/task.png");
    this.load.image("operation", "assets/operation.png");
    this.load.image("script", "assets/script.png");
    this.load.image("if", "assets/if.png");
    this.load.image("line", "assets/line.png");
    this.load.image("ellipse", "assets/ellipse.png");
    this.load.image("end", "assets/end.png");
  }

  create() {
    this.createBackgroung();
    this.createLines();
    this.createBlock();
  }

  createBackgroung() {
    // this.add.sprite(config.width/2, config.heigth/2, 'background')//длина ширин заданы через системные переменные
    this.add.sprite(0, 0, "background").setOrigin(0, 0);
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
    let positions = [
      { x: 60, y: 60, img: "line", turn:180  },
      { x: 180, y: 180, img: "line", turn:90  },
      { x: 300, y: 60, img: "line" , turn:270 },
      { x: 60, y: 300, img: "line", turn:0  },
      { x: 180, y: 420, img: "line" , turn:90 },
      { x: 300, y: 300, img: "line", turn:180  },
      { x: 60, y: 540, img: "line", turn:270  },
      { x: 180, y: 660, img: "line" , turn:0 },
      { x: 300, y: 540, img: "line", turn:90  },
      { x: 180, y: 60, img: "ellipse", turn:180  },
      { x: 60, y: 180, img: "ellipse", turn:90  },
      { x: 180, y: 300, img: "ellipse", turn:180  },
      { x: 300, y: 420, img: "ellipse", turn:0  },
      { x: 60, y: 420, img: "ellipse", turn:270  },
      { x: 1800, y: 540, img: "ellipse", turn:90  },
      { x: 300, y: 660, img: "ellipse", turn:180  },
      { x: 60, y: 660, img: "ellipse", turn:270  },
      { x: 300, y: 180, img: "ellipse", turn:90 },
    ];

    return positions;
  }

  getBlocksPositions() {
    let positions = [
      { x: 180, y: 180, img: "task" },
      { x: 300, y: 60, img: "operation" },
      { x: 60, y: 300, img: "if" },
      { x: 180, y: 420, img: "script" },
      { x: 300, y: 300, img: "script" },
      { x: 60, y: 540, img: "operation" },
      { x: 300, y: 540, img: "task" },
    ];

    let img = ["task", "operation", "if", "script", "script", "operation","task"];
    Phaser.Utils.Array.Shuffle(img);

    positions.forEach((element, i) => {
      element.img = img[i];
    });

    let defaultEl = [
      { x: 60, y: 60, img: "start" },
      { x: 180, y: 660, img: "end" },
    ];

    positions = positions.concat(defaultEl)
    return positions;
  }
}

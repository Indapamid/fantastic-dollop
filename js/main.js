// async function getElma() {
//   let body_data = {
//     difficulty: "Senior",
//     playerID: "x1y2i3s4o5s6i",
//   };
//   const resp = await fetch(
//     "https://ecjuctl5bmygo.elma365.ru/api/extensions/0fc46179-0c97-49d8-9d98-597995f2a4b5/script/create_game",
//     {
//       method: "POST",
//       headers: {
//         Authorization: "Bearer 93d821f2-0ae4-4851-a990-d55b59ed8736",
//       },
//       body: JSON.stringify(body_data),
//     }
//   );
//   console.log(await resp.json());
// }
// const length = 1000;
// const filledArray = Array(length).fill({ value: 0 });
// for (let el of filledArray) {
//   getElma();
// } 


let config = {
  type: Phaser.AUTO,
  width: 360,
  heigth: 768,
  scene: new GameScene(),
};

let game = new Phaser.Game(config);

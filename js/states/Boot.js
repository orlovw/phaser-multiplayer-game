//width: window.innerWidth       поменять для компиляции
const GAME_WIDTH = 800;

//height: window.innerHeight	   поменять для компиляции
const GAME_HEIGHT = 500;

const config = {
  type: Phaser.WebGL, // Which renderer to use

  width: GAME_WIDTH, // Canvas width in pixels
  height: GAME_HEIGHT, // Canvas height in pixels
  
  parent: "MainScene", // ID of the DOM element to add the canvas to
  pixelArt: true,
  scene: {
    preload: preload,
    create: create,
    update: update
  },
  physics: {
    default: "arcade",
    arcade: {
      debug: true,
      gravity: { y: 0 }
    }}
};

const Game = new Phaser.Game(config);

let map;
let layers = ["ground_bot", "ground_top", "trunk", "items", "tree_top"];
let layersColliding = ["ground_bot"];

let interface;

let container;


function preload() {
  // Runs once, loads up assets like images and audio
  map = new Map(this);
  map.loadMap("level1", "level1");

  interface = new Interface(this);

  Player.preload(this);
}

function create() {
  map.createLayers(layers, "level1", layersColliding);

  player = new Player(this, 400, 400);

  interface.addStick();
  player.createCursors(interface.stick);

  //group = this.add.group();
  container = this.add.container();

  const camera = this.cameras.main;
  camera.setBackgroundColor("#99ddff");

  map.setCollision(player.sprite, "ground_bot");
  map.debugCollision("ground_bot");

  this.cameras.main.startFollow(player.sprite, false, 0.5, 0.5);


  // Help text that has a "fixed" position on the screen
  let text = this.add
    .text(16, 16, "Ходить стрелочками", {
      font: "18px monospace",
      fill: "#ffffff",
      padding: { x: 20, y: 10 }
      //backgroundColor: "#000000"
    })
    .setScrollFactor(0);

  //text.destroy();  ~working
  
  //player


/*
  let config = {
        key: 'walk',
        frames: this.anims.generateFrameNumbers('player'),
        frameRate: 10,
        yoyo: false,
        repeat: -1
    };

  this.anims.create(config);

  sprite.anims.load('walk');
  sprite.anims.play('walk');
*/
  
  //group.add(sprite);

  //colission on debug on
  //map.spawnObjects();
}

function update(time, delta) {
  // Runs once per frame for the duration of the scene
  player.update();
}

function groupUpdate(child) {

}

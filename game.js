var game = new Phaser.Game(600, 750, Phaser.AUTO, 'phaser-example',
  {preload: preload, create: create, update: update});
// Necessary global variables and arrays for game canvas
var player;
var ground1;
var ground2;
var random;
var upimage = ['upbar1', 'upbar2', 'upbar3'];
var downimage = ['downbar1', 'downbar2', 'downbar3'];
var updimensions = [250, 150, 350, 430];
var upbars = [];
var downbars = [];
var gate = [];
var style;
var text;
var highscore = 0;
var highscoreDisplay;
var playerDead = false;

// Preload loads necessary assets to game
function preload() {
  game.load.image('player', 'jora.png');
  game.load.image('ground', 'wallHorizontal.png');
  game.load.image('upbar1', 'upbar1.png');
  game.load.image('upbar2', 'upbar2.png');
  game.load.image('upbar3', 'upbar3.png');
  game.load.image('upbar4', 'upbar4.png');
  game.load.image('downbar1', 'downbar1.png');
  game.load.image('downbar2', 'downbar2.png');
  game.load.image('downbar3', 'downbar3.png');
  game.load.image('downbar4', 'downbar4.png');
}

// Create initialises game scene in HTML canvas
function create() {
  game.world.setBounds(0, 0, 10000, 600);
  game.stage.backgroundColor = "#808080";
  game.physics.startSystem(Phaser.Physics.ARCADE);
  player = game.add.sprite(200, game.world.centerY, 'player');
  player.anchor.setTo(0.5, 0.5);
  player.scale.setTo(0.14, 0.15);
  game.camera.follow(player);
  player.enableBody = true;
  game.physics.arcade.enable(player);
  game.camera.follow(player);
  player.body.gravity.y = 700;
  player.body.velocity.x = 100;
  ground1 = game.add.sprite(0, 680, 'ground');
  ground1.scale.setTo(20, 1);
  game.physics.arcade.enable(ground1);
  ground1.enableBody = true;
  ground1.body.immovable = true;
  ground2 = game.add.sprite(0, 0, 'ground');
  ground2.scale.setTo(20, 2);
  game.physics.arcade.enable(ground2);
  ground2.enableBody = true;
  ground2.body.immovable = true;
  createBars();
  text = "Score:" + highscore;
  style = {font: "20px Arial", fill: "#ff0044",};
  highscoreDisplay = game.add.text(200, 700, text, style);
  game.time.events.loop(2900, highScore, this);
}

// Function runs at 60fps roughly to check for collisions
function update() {
  if (game.input.activePointer.isDown) {
    player.body.velocity.y = -250;
  }
  game.physics.arcade.collide(player, upbars, playerDie);
  game.physics.arcade.collide(player, downbars, playerDie);
  game.physics.arcade.collide(player, ground1, playerDie);
  game.physics.arcade.collide(player, ground2, playerDie);
  highscoreDisplay.x = player.x;
}

// Function generates bars as obstacles for game
var createBars = function () {
  for (var i = 2; i < 500; i++) {
    random = game.rnd.integerInRange(0, 2);
    upbars[i] = game.add.sprite(i * 250, 40, upimage[random]);
    game.physics.arcade.enable(upbars[i]);
    upbars[i].enableBody = true;
    upbars[i].body.immovable = true;
    downbars[i] = game.add.sprite(i * 250, 680, downimage[random]);
    downbars[i].anchor.setTo(0, 1);
    game.physics.arcade.enable(downbars[i]);
    downbars[i].enableBody = true;
    downbars[i].body.immovable = true;
    gate[i] = game.add.sprite((i * 250) + 20, 40 + updimensions[random], 'gate');
    gate[i].scale.setTo(0.0001, 2);
    gate[i].enableBody = true;
    game.physics.arcade.enable(gate[i]);
  }
};

// Function kills player
var playerDie = function () {
  player.kill();
  playerDead = true;
};

// Function updates highscore for game
var highScore = function () {
  if (!playerDead) {
    highscore = highscore + 1;
    highscoreDisplay.text = "Score: " + highscore;
  }
};

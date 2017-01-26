let gameWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth

let gameHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight

var game = new Phaser.Game(1000, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

var player;

function preload(){
  game.load.image('grass', '../assets/grass.jpg')
  game.load.image('mage', '../assets/mage1.png')
  game.load.image('bomb', '../assets/bomb.png')
}

function create(){
  game.world.setBounds(0,200,1000 ,600)
  let background = game.add.tileSprite(0,0,1000,600, 'grass')
  game.physics.startSystem(Phaser.Physics.P2JS);
  let mage = new Mage(game)
  player = mage
}


function update(){
  if(player){
    player.update(game)
  }

}

class Bomb {
  constructor(game, player){
    this.game = game;
    this.x;
    this.y;
    this.addSprite()
  }
  addSprite(){
    this.sprite = this.game.add.sprite(player.x, player.y, 'bomb')
  }

}

class Mage {
  constructor(game){
    this.game = game
    this.x;
    this.y;
    this.health = 100;
    this.exp = 0;
    this.addSprite()
    this.bombs = []
    this.limit = 1
  }
  addSprite(){
    this.sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.ramndomY, 'mage')
    this.game.physics.p2.enable(this.sprite);
    this.game.camera.follow(this.sprite)
    this.sprite.body.fixedRotation= true;
  }
  update(game){
    let cursors = game.input.keyboard.createCursorKeys();
    let wasd = {
      up: game.input.keyboard.addKey(Phaser.Keyboard.W),
      down: game.input.keyboard.addKey(Phaser.Keyboard.S),
      left: game.input.keyboard.addKey(Phaser.Keyboard.A),
      right: game.input.keyboard.addKey(Phaser.Keyboard.D),
    };
    let space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
    this.x = this.sprite.body.x;
    this.y = this.sprite.body.y;

    this.sprite.body.setZeroVelocity()
    if (cursors.left.isDown || wasd.left.isDown)
    {
        this.sprite.body.moveLeft(200);
    }
    if (cursors.right.isDown || wasd.right.isDown)
    {
        this.sprite.body.moveRight(200);
    }
    if (cursors.up.isDown || wasd.up.isDown)
    {
        this.sprite.body.moveUp(200);
    }
    if (cursors.down.isDown || wasd.down.isDown)
    {
        this.sprite.body.moveDown(200);
    }
    if (space.isDown){
      if(this.limit > this.bombs.length)
      this.bombs.push(new Bomb(game, this))
    }
  }

}

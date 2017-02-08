function arrayMaker(start, end) {
  var result = []
  for (var i = start; i <= end; i++) {
    result.push(i)
  }
  return result;
}

var explosion = arrayMaker(70, 75).concat(arrayMaker(226, 230));

export default class MechaKoopa {
  constructor(game, x, y, range){
      this.game = game;
      this.x =x;
      this.y = y;
      this.health = 1;
      this.power = Math.random() * 30;
      this.exploded = false
      this.limit = 1
      this.range = range
      this.blownUp = false
      this.addSprite()

    }

  addSprite(){
    this.sprite = this.game.add.sprite(this.x, this.y, 'mechaKoopa', 2)
    this.sprite.anchor.set(.4,.4);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.body.immovable = true;
    this.sprite.body.moves = false;
    this.sprite.physicsBodyType= Phaser.Physics.ARCADE;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.enableBody = true;

     this.sprite.animations.add('explodeLeft', arrayMaker(39,49).concat(arrayMaker(56, 62)).concat(arrayMaker(39,49).concat(arrayMaker(56, 62))).concat(arrayMaker(39,49).concat(arrayMaker(56, 62))), 15)
     this.sprite.body.setSize(48,48)



    this.sprite.body.fixedRotation= true;
  }

  explode() {


    if (!this.blownUp) {

      var timer = game.time.events.add(Phaser.Timer.SECOND * 2.5, () => {
        this.sprite.kill();

      })
      this.blownUp = true;
    }
  }

  update(game){


  }
}

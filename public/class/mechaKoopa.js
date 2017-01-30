function arrayMaker(start, end) {
  var result = []
  for (var i = start; i <= end; i++) {
    result.push(i)
  }
  return result;
}

var explosion = arrayMaker(70, 75).concat(arrayMaker(226, 230));

class MechaKoopa {
  constructor(game, x, y){
      this.game = game;
      this.x =x;
      this.y = y;
      this.health = 1;
      this.power = Math.random() * 30;
      this.exploded = false
      this.limit = 1
      this.addSprite()
      this.blownUp = false
    }

  addSprite(){
    this.sprite = this.game.add.sprite(this.x, this.y, 'mechaKoopa')
    this.sprite.anchor.set(.5,.5);
    this.sprite.scale.setTo(0.6,0.6);
    this.game.physics.arcade.enable(this.sprite);
    this.sprite.physicsBodyType= Phaser.Physics.ARCADE;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.enableBody = true;
    this.sprite.animations.add('walkLeft', arrayMaker(13,24), 15, true)
    this.sprite.animations.add('walkRight', arrayMaker(155,191), 15, true)
    this.sprite.animations.add('explodeLeft', arrayMaker(39,49).concat(arrayMaker(56, 63)).concat(explosion), 15, false)
    this.sprite.animations.add('explodeRight', arrayMaker(195,206).concat(arrayMaker(214, 222)).concat(explosion), 15, false)
    this.sprite.animations.add('pauseLeft', arrayMaker(18,26), 3)
    this.sprite.animations.add('pauseRight', arrayMaker(166,175), 3)



    this.sprite.body.fixedRotation= true;
  }

  explode() {
    
    
    if (!this.blownUp) {

      var timer = game.time.events.add(Phaser.Timer.SECOND * 2.5, () => {
        console.log('hello');
        this.sprite.kill();
      })
      this.blownUp = true;
    }
  }

  update(game){
    //this.sprite.animations.play('walkLeft')
    this.x = this.sprite.body.x;
    this.y = this.sprite.body.y;

    if (this.x > player.x) {
      if (Math.abs(this.x - player.x ) < 150) {
        this.sprite.animations.play('explodeLeft');
        this.explode();

      } else {
        this.sprite.animations.play('walkLeft');
      }
    }
    else if (this.x < player.x) {
      if (Math.abs(this.x - player.x ) < 150) {
        this.sprite.animations.play('explodeRight');
        this.explode();
      } else {
        this.sprite.animations.play('walkRight');
      }
    }


      game.physics.arcade.moveToXY(this.sprite, player.x, player.y, 100)

  }
}

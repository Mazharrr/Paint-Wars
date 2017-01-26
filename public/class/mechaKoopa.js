class MechaKoopa {
  constructor(game){
      this.game = game
      this.x;
      this.y;
      this.health = 1;
      this.power = Math.random() * 30;
      this.exploded = false
      this.limit = 1
      this.addSprite()
    }
    addSprite(){
      this.sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.ramndomY, 'mechaKoopa')
      this.sprite.scale.setTo(2,2)
      this.game.physics.p2.enable(this.sprite);
      this.game.camera.follow(this.sprite)
      this.sprite.animations.add('walk')
      this.sprite.animations.play('walk', 15, true)
      this.sprite.body.fixedRotation= true;
    }
    update(game){
      this.x = this.sprite.body.x;
      this.y = this.sprite.body.y;
      game.physics.arcade.moveToXY(this.sprite, player.x, player.y, 30)
    }
}

class Hero{
  constructor(game){
      this.game = game
      this.x;
      this.y;
      this.health = 100;
      this.exp = 0;
      this.addSprite()
      this.bombs = []
      this.limit = 1
      this.direction = 'left';
      
    }
    addSprite(){
      this.sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.ramndomY, 'hero1')
      this.sprite.scale.setTo(2,2)
      this.game.physics.p2.enable(this.sprite);
      this.game.camera.follow(this.sprite)
      this.sprite.animations.add('walk')
      this.sprite.animations.play('walk', 15, true)
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

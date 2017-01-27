class Hero{
  constructor(game){
      this.healthBar = new HealthBar(game, {x: 200, y: 200, width: 120, isFixedToCamera: false, height: 15 });
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
      game.physics.arcade.enable(this.sprite)
      this.sprite.enableBody = true;
      this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
      this.sprite.body.collideWorldBounds = true;
      this.game.camera.follow(this.sprite)
      this.sprite.body.setSize(40,60)
      this.sprite.animations.add('walk',[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,84,85,85,86,87], 15)
      this.sprite.animations.add('spin',[165,166,167,168,169,170,171,172], 10)
      this.sprite.animations.play('walk')
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
      this.space = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)
      this.x = this.sprite.body.x;
      this.y = this.sprite.body.y;
      // this.sprite.animations.play('walk')

      this.sprite.body.velocity.setTo(0,0)
      if (cursors.left.isDown || wasd.left.isDown)
      {
          this.sprite.body.velocity.x= -200;
      }
      if (cursors.right.isDown || wasd.right.isDown)
      {
          this.sprite.body.velocity.x = 200;
      }
      if (cursors.up.isDown || wasd.up.isDown)
      {
          this.sprite.body.velocity.y = -200;
      }
      if (cursors.down.isDown || wasd.down.isDown)
      {
          this.sprite.body.velocity.y= 200;
      }
      if (this.space.isDown){
        this.sprite.animations.play('spin')


      }
      if(!this.space.isDown){
        this.sprite.animations.play('walk')
      }
      this.healthBar.setPercent(this.health);
      this.healthBar.setPosition(this.sprite.x+30 , this.sprite.y-20  )
      if(this.health <=0){
        this.sprite.kill();
        this.x = game.world.randomX;
        this.y = game.world.randomY;
              this.exp = 0;
              this.health= 100;
              this.addSprite();
      }
    }
}

function onHitHero(){
  // console.log('hero is attacking')
}

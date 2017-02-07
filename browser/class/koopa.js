
export default class Koopa {
  constructor(game){
    this.healthBar = new HealthBar(game, {x: 200, y: 200, width: 120, isFixedToCamera: false, width: 50, height: 15 });
    this.game = game;
    this.x;
    this.y;
    this.health = 100;
    this.alive = true;
    this.addSprite();
    this.rollingTime =0;
    this.stunTime = 0;
    this.hitTime =0;
  }
  addSprite(){
    this.sprite = this.game.add.sprite(this.game.world.randomX, this.game.world.ramndomY, 'koopa')
    this.sprite.animations.add('roll')
    game.physics.arcade.enable(this.sprite)
    this.sprite.scale.setTo(2,2)
    this.sprite.physicsBodyType= Phaser.Physics.ARCADE;
    this.sprite.body.collideWorldBounds = true;
    this.sprite.enableBody = true;
    this.sprite.body.fixedRotation= true;

    // EI: const/let?
    var N = 15;
    var seq = Array.apply(null, {length: N}).map(Number.call, Number);

    this.sprite.animations.add('right', seq, 15, false);
  }


  update(game){
    this.x = this.sprite.body.x;
    this.y = this.sprite.body.y;

       if(game.time.now > 3000 && game.time.now> this.stunTime && Math.abs(this.y - player.y-50) < 1 ){
      this.rollingTime = game.time.now+2000
      this.stunTime = game.time.now+5000
      this.sprite.body.velocity.setTo(0,0)
      this.sprite.animations.play('roll', 15, true)
      if(this.x > player.x){

         this.sprite.body.velocity.x= -500;

      }

      if(this.x < player.x){
         this.sprite.body.velocity.x=500;

      }
     }
      else if(game.time.now> this.stunTime){  // not attacking
         game.physics.arcade.moveToXY(this.sprite, this.x, player.y+50, 100);

      }

        game.physics.arcade.collide(this.sprite, player.sprite, ()=>this.onHit())

      this.healthBar.setPercent(this.health);
      this.healthBar.setPosition(this.sprite.x+30, this.sprite.y-10)
      if(this.stunTime > game.time.now && game.time.now > this.rollingTime){
        this.sprite.animations.stop()
      }

      if(this.health<=0){
        this.sprite.kill()
        this.healthBar.kill()
      }

  }

  onHit(){
    if(this.hitTime < game.time.now && game.time.now< this.rollingTime){
      this.hitTime = game.time.now+5000
      player.health -=10
      this.sprite.loadTexture('koopa')
    }

    if(player.space.isDown){
      // console.log(this.health)
      this.health-=1
      // console.log('ran')
    }
  }


}


class Koopa {
  constructor(game){
    this.game = game;
    this.x;
    this.y;
    this.health = 100;
    this.alive = true;
    this.addkoopa();
    this.rollingTime =0;
  }
  addkoopa(){
    this.koopa = this.game.add.sprite(this.game.world.randomX, this.game.world.ramndomY, 'koopa')
    this.game.physics.p2.enable(this.koopa);
   this.koopa.body.setRectangle(40,40)
    this.koopa.body.fixedRotation= true;
    this.koopa.body.setCollisionGroup(koopaCollisionGroup)
    this.koopa.body.collides([koopaCollisionGroup, playerCollisionGroup])

    var N = 15;
    var seq = Array.apply(null, {length: N}).map(Number.call, Number);

    this.koopa.animations.add('right', seq, 15, false);
  }


  update(game){
    this.x = this.koopa.body.x;
    this.y = this.koopa.body.y;

     // let rolling = false;

       if(game.time.now> this.rollingTime && Math.abs(this.y - player.y) < 1 ){
      this.rollingTime = game.time.now+4000
      this.koopa.body.setZeroVelocity()
      if(this.x > player.x){
         this.koopa.body.moveLeft(1000);
         // while(this.x > this.x + )
         // this.rolling = false;


      }

      if(this.x < player.x){
         this.koopa.body.moveRight(1000);
         // this.rolling = false;

      }
     }
      else if(game.time.now> this.rollingTime){  // not attacking
         game.physics.arcade.moveToXY(this.koopa, this.x, player.y, 100);

      }

      game.physics.arcade.collide(this.koopa, player.sprite, () => {console.log("hit")});








        //console.log(player);
        // this.koopa.body.moveLeft(200);
        // this.koopa.animations.play('right');


        // this.koopa.body.moveRight(200);


        // this.koopa.body.moveUp(200);


        // this.koopa.body.moveDown(200);



  }
}

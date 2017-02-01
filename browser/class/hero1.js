import {Utils} from './utils'
import MechaKoopa from './mechakoopa'
import Game1 from '../states/game'
import store from '../store';
import {removeCrate, addPaint, loadCrates, removePaint, addFlames} from '../reducers/Classes'



export default class Hero{
  constructor(game, fire, paint){
      // this.healthBar = new HealthBar(game, {x: 200, y: 200, width: 120, isFixedToCamera: false, height: 15 });
      this.game = game
      this.x;
      this.y;
      this.health = 100;
      this.exp = 0;
      this.addSprite()
      this.bombs = []
      this.limit = 1
      this.direction = 'left';
      this.range = 2
      this.fire = fire
      this.paint = paint
      this.color = 'blue';

    }
    addSprite(){
      this.sprite = this.game.add.sprite(32, 32, 'hero1')

      this.sprite.scale.setTo(0.4,0.4)
      this.game.physics.arcade.enable(this.sprite)
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
      game.world.bringToTop(this.fire)
      game.world.bringToTop(this.sprite)
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
      if(this.bomb) {
        console.log('theres a bomb')
        game.physics.arcade.collide(this.sprite, this.bomb.sprite)};
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
      if(this.bombs.length < this.limit){

        let blockCoords = Utils.mapCoordsToBlock(this.x, this.y )

       this.bomb = new MechaKoopa(game, blockCoords.x, blockCoords.y);
       this.bomb.sprite.animations.play('explodeLeft');
       
    
       this.bombs.push(this.bomb);
       console.log(this.bomb instanceof MechaKoopa);
     if (!this.bomb.blownUp) {

      var timer = game.time.events.add(Phaser.Timer.SECOND * 2.5, () => {
        this.bomb.sprite.kill();
        this.bombs.pop();
        let allCrates = store.getState().Classes.crates;
        let cratesToKill = Utils.adjacentCrates(blockCoords.x, blockCoords.y, this.range, allCrates);
        console.log(cratesToKill);
        let flameArr = [];
        let paintArr= cratesToKill.slice();
        cratesToKill.forEach(crate => {
          // console.log(crate);
            if (allCrates[crate.x] && allCrates[crate.x][crate.y].crate === false) {
            let flameXY = Utils.indexToXY(crate.x, crate.y)
            let flame = this.fire.create(flameXY.x, flameXY.y, 'fire');
            
            flame.scale.setTo(0.5,0.5)
            flame.anchor.setTo(0.5,0.5)
            store.dispatch(addFlames(crate.x, crate.y, flame))
            //flameArr.push(flame)


          }
          let paintGrid = Utils.indexToXY(crate.x, crate.y);
          let myPaint = this.paint.create(paintGrid.x, paintGrid.y, this.color)
              myPaint.scale.setTo(0.08,0.08)
              myPaint.anchor.setTo(0.5,0.5)
              store.dispatch(addPaint(crate.x, crate.y,  myPaint))
         

          if (allCrates[crate.x] && allCrates[crate.x][crate.y]&& allCrates[crate.x][crate.y].crate !== false) {
            console.log(allCrates[crate.x][crate.y])
            allCrates[crate.x][crate.y].crate.kill()
            store.dispatch(removeCrate(crate.x, crate.y))
          };
        })

        // flameArr.forEach(flame => {
        //     let timer = game.time.events.add(Phaser.Timer.SECOND * .2, () => {
        //       // let paintX= flame.x
        //       console.log('hero')
        //       // let paintY= flame.y
        //      // let paintGrid = Utils.mapCoordsToGrid(paintX, paintY)
        //       flame.kill()
        //       //let myPaint = this.paint.create(paintX, paintY, 'bluePaint')
        //       // myPaint.scale.setTo(0.08,0.08)
        //       // myPaint.anchor.setTo(0.5,0.5)
        //       // store.dispatch(addPaint(paintGrid.x, paintGrid.y,  myPaint))
        //       console.log(store.getState().Classes.crates)
        //     });

        //   })



      });
      this.bomb.blownUp = true;
    }
  }
      }
      if(!this.space.isDown){
        this.sprite.animations.play('walk')
      }
      // this.healthBar.setPercent(this.health);
      // this.healthBar.setPosition(this.sprite.x+30 , this.sprite.y-20  )
      if(this.health <=0){
        this.sprite.kill();
        this.x = game.world.randomX;
        this.y = game.world.randomY;
              this.exp = 0;
              this.health= 100;
              this.addSprite();
      }


      // if(store.getState().Classes.crateCount <119) {store.dispatch(loadCrates())
      // this.sprite.x = 48
      // this.sprite.y= 48}
    }

}

function onHitHero(){
  // console.log('hero is attacking')
}

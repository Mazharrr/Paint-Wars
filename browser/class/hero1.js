import {Utils} from './utils'
import MechaKoopa from './mechakoopa'
import Game1 from '../states/game'
import store from '../store';
import {removeCrate, addPaint, loadCrates, removePaint, addFlames, addPowerUp, removePowerUp, addBomb, removeBomb} from '../reducers/Classes'



export default class Hero{
  constructor(game, fire, paint, powerGroup){
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
      this.immuneTime = 0;
      this.speed = 100
      this.powerGroup = powerGroup
      this.bomb
      this.onePress

    }

    reset(){
      this.limit = 1;
      this.range = 1;
      this.speed = 100;
      let speedDrops = (this.speed-100)/100
      // createSpeedPowerUp(speedDrops)
      let rangeDrops = this.range-1
      // createRangePowerUp(rangeDrops)
      let limitDrops = this.limit-1
     // createLimitPowerUp(limitDrops)
    }
    addSprite(){
      this.sprite = this.game.add.sprite(72, 72, 'hero1')
      this.sprite.scale.setTo(0.7,0.7)
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
      this.sprite.body.setSize(40,40,0,20)
    }

    update(game){
      game.world.bringToTop(this.powerGroup)
      game.world.bringToTop(this.fire)
      if(this.bomb) game.world.bringToTop(this.bomb.sprite)
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
      this.sprite.body.velocity.setTo(0,0)
      this.powerGroup.children.forEach((power)=>{
        this.game.physics.arcade.overlap(this.sprite, power,()=>{

          store.dispatch(removePowerUp(power.gridCords.x , power.gridCords.y))
          if(power.key === 'bombPowerUp') this.limit++
          if(power.key === 'speedPowerUp') this.speed++
          if(power.key === 'rangePowerUp') this.range++
          console.log('colliding with ', power.gridCords)
        })
      })
      // this.game.physics.arcade.overlap(this.sprite, this.powerGroup, ()=>{

      //             console.log('colliding')
      //           })
      if(this.immuneTime > game.time.now){
        this.sprite.body.velocity.setTo(0,0)
      } else {
            if(this.bomb) {
              this.bombs.forEach((bomb)=>{

                game.physics.arcade.collide(this.sprite, bomb.sprite)
              })
            }

            if (cursors.left.isDown || wasd.left.isDown)
            {
                this.sprite.body.velocity.x= -this.speed;
            }
            if (cursors.right.isDown || wasd.right.isDown)
            {
                this.sprite.body.velocity.x = this.speed;
            }
            if (cursors.up.isDown || wasd.up.isDown)
            {
                this.sprite.body.velocity.y = -this.speed;
            }
            if (cursors.down.isDown || wasd.down.isDown)
            {
                this.sprite.body.velocity.y= this.speed;
            }
          }

      if (this.space.isDown){
          if(!this.onePress){
        // this.sprite.animations.play('spin')
        if(this.bombs.length < this.limit ){
          let blockCoords = Utils.mapCoordsToBlock(this.x+10, this.y+20 )
          let gridCoords = Utils.mapCoordsToGrid(blockCoords.x,blockCoords.y)
             if(!(this.immuneTime > game.time.now)){

                if(!store.getState().Classes.crates[gridCoords.x][gridCoords.y].bomb)
                {
                this.bomb = new MechaKoopa(game, blockCoords.x, blockCoords.y);
                this.bomb.sprite.animations.play('explodeLeft');
                this.bombs.push(this.bomb);
                store.dispatch(addBomb(gridCoords.x, gridCoords.y, this.bomb))
                  }
             }


           if (!this.bomb.blownUp) {
              this.explosion(gridCoords, blockCoords, this.bomb, 4)

          }
        }
        this.onePress = true
      }

    }
      if(this.space.isUp) this.onePress= false;
        this.sprite.animations.play('walk')
    }
    explosion(gridCoords, blockCoords, myBomb, time){
              myBomb.timer = this.game.time.events.add(Phaser.Timer.SECOND * time, () => {
              store.dispatch(removeBomb(gridCoords.x, gridCoords.y))
              this.bombs.pop();
              let allCrates = store.getState().Classes.crates;
              let cratesToKill = Utils.adjacentCrates(blockCoords.x, blockCoords.y, this.range, allCrates);
              let flameArr = [];
              let paintArr= cratesToKill.slice();

              cratesToKill.forEach(crate => {
                  if (allCrates[crate.x] && allCrates[crate.x][crate.y].crate === false) {
                    let flameXY = Utils.indexToXY(crate.x, crate.y)
                    let flame = this.fire.create(flameXY.x, flameXY.y, 'fire');

                    flame.scale.setTo(1.2,1.2)
                    flame.anchor.setTo(0.5,0.5)
                    store.dispatch(addFlames(crate.x, crate.y, flame))
                    if(allCrates[crate.x][crate.y].bomb && allCrates[crate.x][crate.y].bomb !== myBomb){
                      this.game.time.events.remove(allCrates[crate.x][crate.y].bomb.timer)
                      this.explosion({x: crate.x, y: crate.y}, {x: crate.x*48+24, y: crate.y*48+24}, allCrates[crate.x][crate.y].bomb, 0)
                    }

                  }

                let paintGrid = Utils.indexToXY(crate.x, crate.y);
                  if(allCrates[crate.x][crate.y].paint.key!==this.color){
                    let myPaint = this.paint.create(paintGrid.x, paintGrid.y, this.color)
                    myPaint.scale.setTo(0.15,0.15)
                    myPaint.anchor.setTo(0.5,0.5)
                    store.dispatch(addPaint(crate.x, crate.y,  myPaint))
                  }
                  if (allCrates[crate.x] && allCrates[crate.x][crate.y]&& allCrates[crate.x][crate.y].crate !== false) {
                    allCrates[crate.x][crate.y].crate.kill()
                    store.dispatch(removeCrate(crate.x, crate.y))
                    let powerUpChance = Math.floor(Math.random()*2)+1
                    let powerXY = Utils.indexToXY(crate.x, crate.y)
                    if(powerUpChance ===1){

                    let power = this.powerGroup.create(powerXY.x, powerXY.y, 'bombPowerUp')
                    power.gridCords= {x: crate.x, y: crate.y}
                    power.scale.setTo(0.8,0.8)
                    power.anchor.setTo(0.5,0.5)
                    // this.limit ++;
                    store.dispatch(addPowerUp(crate.x, crate.y, power))
                    }


                  };

                })

                this.game.physics.arcade.collide(this.sprite, this.fire, () => {
                    if(this.immuneTime < this.game.time.now){
                      this.immuneTime = this.game.time.now + 1000;
                      //animation goes here
                    }
                    store.dispatch(removePaint(this.color))
                })
            });
            this.bomb.blownUp = true;
    }

    // setEx(bomb, time){

    // }

}

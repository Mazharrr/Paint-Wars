import {Utils} from './utils'
import MechaKoopa from './mechakoopa'
import Game1 from '../states/game'
import store from '../store';
import {removeCrate, addPaint, loadCrates, removePaint, addFlames, addPowerUp, removePowerUp, addBomb, removeBomb} from '../reducers/Tiles';
import {addPlayerName, addAvatar, increaseScore, addToPlayerPowerUp, killPlayer} from '../reducers/Player';
import {addMultiplayerAvatar, incrementMuliplayerScore, resetMultiplayerScore, restartMultiplayerScoreboard} from '../reducers/Scoreboard';
import socket from '../socket.js'
import {powerGroup, crate, fire, paint} from '../states/game'


//dummy data for name and avatar
let dummy = {
  name: "James",
  avatar: "https://pbs.twimg.com/profile_images/490094309757038594/WvFG7LDV_reasonably_small.png"
}


export default class Hero{
  constructor(game, id, color ){
      this.game = game
      this.x;
      this.y;
      this.health = 100;
      this.exp = 0;
      this.bombs = []
      this.direction = 'left';
      this.limit = store.getState().Player.limit
      this.range = store.getState().Player.range
      this.speed = store.getState().Player.speed
      this.fire = fire
      this.paint = paint
      this.color = color
      this.immuneTime = 0;
      this.powerGroup = powerGroup
      this.bomb
      this.onePress
      this.name = store.dispatch(addPlayerName(dummy.name))
      this.avatar = store.dispatch(addAvatar(dummy.avatar))
      store.dispatch(addMultiplayerAvatar(this.color, dummy.avatar))
      store.dispatch(restartMultiplayerScoreboard);
      this.score = store.getState().Player.score
      this.id = id
      this.addSprite()

    }


    //after redux for score board, new bug at line 63..."cannot read property x of undefined..."
    reset(){
      let speedDrops = Array((this.speed-100)/25).fill('speedPowerUp')
      // createSpeedPowerUp(speedDrops)
      let rangeDrops = Array(this.range-1).fill('rangePowerUp')
      // createRangePowerUp(rangeDrops)
      let limitDrops = Array(this.limit-1).fill('bombPowerUp')
     // createLimitPowerUp(limitDrops)
      let totalDrops = speedDrops.concat(rangeDrops).concat(limitDrops);
      let availableTiles =[]
      store.getState().Tiles.crates.forEach((row, indexX) => {
         row.forEach((tile, indexY) =>{
           if(tile.crate === false && tile.obstacle===false && tile.powerUp===false)
           availableTiles.push({x: indexX, y: indexY})
           })
      })



      totalDrops.forEach(powerUp =>{
        let randNum = Math.floor(Math.random()*availableTiles.length)
        let randTile = availableTiles[randNum]
        let powerXY = Utils.indexToXY(randTile.x, randTile.y)
        socket.emit('client_make_power', {
            x: powerXY.x, y: powerXY.y, gridX: randTile.x, gridY: randTile.y, power: powerUp, socket: socket.id
          })
        let power = this.powerGroup.create(powerXY.x, powerXY.y, powerUp)
        power.gridCords= {x: randTile.x, y: randTile.y}
        power.scale.setTo(1.3,1.3)
        power.anchor.setTo(0.5,0.5)
        store.dispatch(addPowerUp( randTile.x, randTile.y , power))
        availableTiles.splice(randNum, 1);

      })
    }
    addSprite(){
      switch(this.color){
        case 'blue':
        this.sprite = this.game.add.sprite(72, 72, 'hero1')
        break;
        case 'purple':
        this.sprite = this.game.add.sprite(648, 648, 'hero1')
        break;
        case 'green':
        this.sprite = this.game.add.sprite(648, 72, 'hero1')
        break;
        case 'red':
        this.sprite = this.game.add.sprite(72, 648, 'hero1')
        break;
        default:
        break
      }
      this.sprite.scale.setTo(0.7,0.7)
      this.game.physics.arcade.enable(this.sprite)
      this.sprite.enableBody = true;
      this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
      this.sprite.body.collideWorldBounds = true;
      this.game.camera.follow(this.sprite)
      this.sprite.animations.add('walk',[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,84,85,85,86,87], 15)
      this.sprite.animations.add('spin',[165,166,167,168,169,170,171,172], 10)
      this.sprite.animations.play('walk')
      this.sprite.body.fixedRotation= true;
      this.sprite.body.setSize(35,35,10,20)
    }

    update(game){
      this.limit = store.getState().Player.limit
      this.range = store.getState().Player.range
      this.speed = store.getState().Player.speed
      this.score = store.getState().Player.score


      this.updateSocket()

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


      this.game.physics.arcade.collide(this.sprite, this.fire, () => {
          if(this.immuneTime < this.game.time.now){
            this.immuneTime = this.game.time.now + 1000;
            //animation goes here
          }
          socket.emit('client_remove_paint',{color: this.color, socket: socket.id})

          store.dispatch(removePaint(this.color))
          this.reset();
            store.dispatch(killPlayer());
            store.dispatch(resetMultiplayerScore(this.color));
      })






      this.x = this.sprite.body.x;
      this.y = this.sprite.body.y;
      this.sprite.body.velocity.setTo(0,0)
      this.powerGroup.children.forEach((power)=>{
        this.game.physics.arcade.overlap(this.sprite, power,()=>{
          socket.emit('client_get_power', {x: power.gridCords.x, y: power.gridCords.y, range: this.range, socket: socket.id})

          store.dispatch(removePowerUp(power.gridCords.x , power.gridCords.y))
          store.dispatch(addToPlayerPowerUp(power.key))


          if(power.key === 'bombPowerUp') this.limit++
          if(power.key === 'speedPowerUp') this.speed+=25
          if(power.key === 'rangePowerUp') this.range++
        })
      })

      if(this.immuneTime > game.time.now){
        this.sprite.body.velocity.setTo(0,0)
      } else {
              store.getState().Tiles.bombs.forEach((bomb)=>{

                game.physics.arcade.collide(this.sprite, bomb.sprite)
              })


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
        if(this.bombs.length < this.limit ){
          let blockCoords = Utils.mapCoordsToBlock(this.x+10, this.y+20 )
          let gridCoords = Utils.mapCoordsToGrid(blockCoords.x,blockCoords.y)
             if(!(this.immuneTime > game.time.now)){

                if(!store.getState().Tiles.crates[gridCoords.x][gridCoords.y].bomb)
                {
                socket.emit('client_place_bomb', {x: blockCoords.x, y: blockCoords.y, range: this.range, socket: socket.id, gridX: gridCoords.x, gridY: gridCoords.y})
                this.bomb = new MechaKoopa(game, blockCoords.x, blockCoords.y, this.range);
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
                socket.emit('client_bomb_explode', {x: gridCoords.x, y: gridCoords.y, socket: socket.id})
              store.dispatch(removeBomb(gridCoords.x, gridCoords.y))
              this.bombs.pop();
              let allCrates = store.getState().Tiles.crates;
              let cratesToKill = Utils.adjacentCrates(blockCoords.x, blockCoords.y, myBomb.range, allCrates);
              let flameArr = [];
              let paintArr= cratesToKill.slice();

              cratesToKill.forEach(crate => {
                  if (allCrates[crate.x] && allCrates[crate.x][crate.y].crate === false) {
                    let flameXY = Utils.indexToXY(crate.x, crate.y)
                    socket.emit('client_make_fire', {
                      x: flameXY.x, y: flameXY.y, gridX: crate.x, gridY: crate.y, socket: socket.id
                    })
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
                  socket.emit('client_make_paint', {
                      x: paintGrid.x, y: paintGrid.y, gridX: crate.x, gridY: crate.y, color: this.color, socket: socket.id
                    })

                    let myPaint = this.paint.create(paintGrid.x, paintGrid.y, this.color)
                    myPaint.scale.setTo(0.15,0.15)
                    myPaint.anchor.setTo(0.5,0.5)
                    store.dispatch(addPaint(crate.x, crate.y,  myPaint))
                    store.dispatch(increaseScore())

                    store.dispatch(incrementMuliplayerScore(this.color));
                  }
                  if (allCrates[crate.x] && allCrates[crate.x][crate.y]&& allCrates[crate.x][crate.y].crate !== false) {
                    socket.emit('client_remove_crate',{x: crate.x, y: crate.y, socket: socket.id})
                    allCrates[crate.x][crate.y].crate.kill()
                    store.dispatch(removeCrate(crate.x, crate.y))
                    let powerUpChance = Math.floor(Math.random()*2)+1
                    let powerXY = Utils.indexToXY(crate.x, crate.y)
                    if(powerUpChance ===1){

                      //pick one of the 3 available powers up
                      const randomPowerUpArray = ['bombPowerUp', 'speedPowerUp', 'rangePowerUp']
                      let randomPowerUp = randomPowerUpArray[Math.floor(Math.random()*randomPowerUpArray.length)];

                      socket.emit('client_make_power', {
                          x: powerXY.x, y: powerXY.y, gridX: crate.x, gridY: crate.y, power: randomPowerUp, socket: socket.id
                        })
                      let power = this.powerGroup.create(powerXY.x, powerXY.y, randomPowerUp)
                      power.gridCords= {x: crate.x, y: crate.y}
                      power.scale.setTo(1.3,1.3)
                      power.anchor.setTo(0.5,0.5)
                      store.dispatch(addPowerUp(crate.x, crate.y, power))
                    }


                  }

                })


            });
            this.bomb.blownUp = true;
    }


  updateSocket(){
        socket.emit('client_data_transfer', {position: this.sprite.position, color: this.color, score: this.score})
  }

}

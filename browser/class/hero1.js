import {Utils} from './utils'
import MechaKoopa from './mechaKoopa'
import Game1 from '../states/game'
import store from '../store';
import {removeCrate, addPaint, loadCrates, removePaint, addFlames, addPowerUp, removePowerUp, addBomb, removeBomb} from '../reducers/Tiles';
import {addPlayerName, addAvatar, increaseScore, addToPlayerPowerUp, killPlayer} from '../reducers/Player';
import {addMultiplayerAvatar, incrementMuliplayerScore, resetMultiplayerScore, restartMultiplayerScoreboard, addNameMultiplayerScore} from '../reducers/Scoreboard';
import socket from '../socket.js'
import {powerGroup, crate, fire, paint} from '../states/game'




let bowserJunior = {
 left: Utils.arrayMaker(18, 25),
 right: Utils.arrayMaker(26, 33),
 up: Utils.arrayMaker(47, 51),
 down: Utils.arrayMaker(42, 46),
 idle: Utils.arrayMaker(0,15),
 attack: Utils.arrayMaker(34, 41),
 dead: Utils.arrayMaker(16,17)
};
let lemmyKoopa = {
 left: Utils.arrayMaker(0,13),
 right: Utils.arrayMaker(26, 39), //fix
 up: Utils.arrayMaker(45, 49),
 down: Utils.arrayMaker(40, 44), //fix
 idle: Utils.arrayMaker(14, 25),
 attack: Utils.arrayMaker(50, 55),
 dead: Utils.arrayMaker(56, 60)
};
let larryKoopa = {
 left: Utils.arrayMaker(60, 79),
 right: Utils.arrayMaker(89, 95),
 up: Utils.arrayMaker(99, 107),
 down: Utils.arrayMaker(80,86),
 idle: Utils.arrayMaker(0, 33),
 attack: Utils.arrayMaker(45, 52),
 dead: Utils.arrayMaker(34,35)
};
let yoshi = {
 left: Utils.arrayMaker(41, 45),
 right: Utils.arrayMaker(23,26),
 up: Utils.arrayMaker(36, 40),
 down: Utils.arrayMaker(18, 27), //fix
 idle: Utils.arrayMaker(8, 16), //fix
 attack: Utils.arrayMaker(0, 7),
 dead: Utils.arrayMaker(33, 35)
};
let characterAnimations = [];


export default class Hero{
  constructor(game, name, color ){
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
      this.name = name
      store.dispatch(addNameMultiplayerScore(this.color, this.name))
      store.dispatch(restartMultiplayerScoreboard());
      this.score = store.getState().Player.score
      this.animation
      this.addSprite()
      this.updateSocket()

      socket.on('server_delete_timer', data=>{
        if(store.getState().Player.name!==data.name  && this.game.game.lobby.id===data.LobbyId && socket.id===data.socket){
          console.log('INSIDER TIMER DELETER')
          this.game.time.events.remove(store.getState().Tiles.crates[data.x][data.y].bomb.timer)
          this.bombs.pop()
        }
      })

      setInterval(()=>{
        if(this.animation || this.intervalRan){
                socket.emit('client_data_transfer', {position: this.sprite.position, color: this.color, score: this.score, name: this.name, animation: this.animation, id: this.game.game.lobby.id, upDown: this.upDown, leftDown: this.leftDown, downDown: this.downDown, rightDown: this.rightDown, speed: this.speed})
              }
          this.intervalRan = false
      }, 1000/60)


    }


    //after redux for score board, new bug at line 63..."cannot read property x of undefined..."
    reset(){
      let speedDrops = Array((this.speed-100)/25).fill('speedPowerUp')
      // createSpeedPowerUp(speedDrops)
      let rangeDrops = Array(this.range-1).fill('rangePowerUp')
      // createRangePowerUp(rangeDrops)
      let limitDrops = Array(this.limit-1).fill('bombPowerUp')
     // createLimitPowerUp(limitDrops)
     console.log('speed', speedDrops)
     console.log('range', rangeDrops)
     console.log('limit', limitDrops)
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
            x: powerXY.x, y: powerXY.y, gridX: randTile.x, gridY: randTile.y, power: powerUp, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id
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
        this.sprite = this.game.add.sprite(72, 72, 'larryKoopa', 2)
        this.avatar="http://vignette1.wikia.nocookie.net/ssb/images/0/03/LarryTrophy3DS.png/revision/latest?cb=20140929194701&format=webp"
        store.dispatch(addAvatar(this.avatar))
        store.dispatch(addMultiplayerAvatar(this.color, this.avatar))
        this.sprite.animations.add('left', larryKoopa.left, 12, true)
        this.sprite.animations.add('right', larryKoopa.right, 12, true)
        this.sprite.animations.add('up', larryKoopa.up, 12, true)
        this.sprite.animations.add('down', larryKoopa.down, 12, true)
        this.sprite.animations.add('idle', larryKoopa.idle, 12, true)
        this.sprite.animations.add('attack', larryKoopa.attack, 30, true)
        this.sprite.animations.add('dead', larryKoopa.dead, 12, true)
        break;
        case 'purple':
        this.sprite = this.game.add.sprite(648, 648, 'lemmyKoopa')
        this.avatar="http://vignette3.wikia.nocookie.net/ssb/images/4/4a/LemmyTrophy3DS.png/revision/latest?cb=20140929194817&format=webp"
        store.dispatch(addAvatar(this.avatar))
        store.dispatch(addMultiplayerAvatar(this.color, this.avatar))
        this.sprite.animations.add('left', lemmyKoopa.left, 12, true)
        this.sprite.animations.add('right', lemmyKoopa.right, 12, true)
        this.sprite.animations.add('up', lemmyKoopa.up, 12, true)
        this.sprite.animations.add('down', lemmyKoopa.down, 12, true)
        this.sprite.animations.add('idle', lemmyKoopa.idle, 8, true)
        this.sprite.animations.add('attack', lemmyKoopa.attack, 12, true)
        this.sprite.animations.add('dead', lemmyKoopa.dead, 12, true)
        break;
        case 'green':
        this.sprite = this.game.add.sprite(648, 72, 'yoshi')
        this.avatar="http://vignette4.wikia.nocookie.net/ssb/images/5/56/Yoshi_%2B_Egg_1.png/revision/latest?cb=20140929214641&format=webp"
        store.dispatch(addAvatar(this.avatar))
        store.dispatch(addMultiplayerAvatar(this.color, this.avatar))
        this.sprite.animations.add('left', yoshi.left, 12, true)
        this.sprite.animations.add('right', yoshi.right, 12, true)
        this.sprite.animations.add('up', yoshi.up, 12, true)
        this.sprite.animations.add('down', yoshi.down, 12, true)
        this.sprite.animations.add('idle', yoshi.idle, 12, true)
        this.sprite.animations.add('attack', yoshi.attack, 12, true)
        this.sprite.animations.add('dead', yoshi.dead, 12, true)
        break;
        case 'red':
        this.sprite = this.game.add.sprite(72, 648, 'bowserJunior')
        this.avatar="http://vignette4.wikia.nocookie.net/ssb/images/e/e1/BowserJrEXTrophy3DS.png/revision/latest?cb=20140929203914&format=webp"
        store.dispatch(addAvatar(this.avatar))
        store.dispatch(addMultiplayerAvatar(this.color, this.avatar))
        this.sprite.animations.add('left', bowserJunior.left, 12, true)
        this.sprite.animations.add('right', bowserJunior.right, 12, true)
        this.sprite.animations.add('up', bowserJunior.up, 8, true)
        this.sprite.animations.add('down', bowserJunior.down, 8, true)
        this.sprite.animations.add('idle', bowserJunior.idle, 12, true)
        this.sprite.animations.add('attack', bowserJunior.attack, 5, true)
        this.sprite.animations.add('dead', bowserJunior.dead, 8, true)
        break;
        default:
        break
      }
      this.sprite.anchor.setTo(0.5,0.5)
      this.game.physics.arcade.enable(this.sprite)
      this.sprite.enableBody = true;
      this.sprite.physicsBodyType = Phaser.Physics.ARCADE;
      this.sprite.body.collideWorldBounds = true;
      this.game.camera.follow(this.sprite)
      this.sprite.animations.play('idle')
      this.sprite.body.fixedRotation= true;
      this.sprite.body.setSize(30,35,0,10)
    }

    update(game){
      this.updateSocket()
      this.limit = store.getState().Player.limit
      this.range = store.getState().Player.range
      this.speed = store.getState().Player.speed
      this.score = store.getState().Player.score
      // this.sprite.body.setSize(35,35,10,20)


      this.game.world.bringToTop(this.powerGroup)
      this.game.world.bringToTop(this.fire)
      if(this.bomb) this.game.world.bringToTop(this.bomb.sprite)
      this.game.world.bringToTop(this.sprite)
      let cursors = this.game.input.keyboard.createCursorKeys();
      let wasd = {
        up: this.game.input.keyboard.addKey(Phaser.Keyboard.W),
        down: this.game.input.keyboard.addKey(Phaser.Keyboard.S),
        left: this.game.input.keyboard.addKey(Phaser.Keyboard.A),
        right: this.game.input.keyboard.addKey(Phaser.Keyboard.D),
      };
      this.space = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR)


      this.game.physics.arcade.collide(this.sprite, this.fire, () => {
          if(this.immuneTime < this.game.time.now){
            this.immuneTime = this.game.time.now + 1000;
            socket.emit('client_remove_paint',{color: this.color, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id})

            store.dispatch(removePaint(this.color))
            this.reset();
            store.dispatch(killPlayer());
            store.dispatch(resetMultiplayerScore(this.color));

          }
      })




      // this.sprite.animations.play('idle')


      this.x = this.sprite.body.x;
      this.y = this.sprite.body.y;
      this.sprite.body.velocity.setTo(0,0)
      this.powerGroup.children.forEach((power)=>{
        this.game.physics.arcade.overlap(this.sprite, power,()=>{
          socket.emit('client_get_power', {x: power.gridCords.x, y: power.gridCords.y, range: this.range, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id})

          store.dispatch(removePowerUp(power.gridCords.x , power.gridCords.y))
          store.dispatch(addToPlayerPowerUp(power.key))


          if(power.key === 'bombPowerUp') this.limit++
          if(power.key === 'speedPowerUp') this.speed+=25
          if(power.key === 'rangePowerUp') this.range++
        })
      })

      if(this.immuneTime > this.game.time.now){
        if(this.animation !='dead')
        this.sprite.animations.play('dead')
        this.animation ='dead'
        this.sprite.body.velocity.setTo(0,0)
      } else {
              store.getState().Tiles.bombs.forEach((bomb)=>{

                this.game.physics.arcade.collide(this.sprite, bomb.sprite)
              })
          this.leftDown
          if (cursors.left.isDown || wasd.left.isDown)
          {
            if(!this.leftDown){
            this.sprite.animations.play('left')
            this.animation='left'
            }
            this.leftDown=true
              this.sprite.body.velocity.x= -this.speed;
          }
          if(cursors.left.isUp && wasd.left.isUp){
            this.leftDown = false

          }
          this.rightDown
            if (cursors.right.isDown || wasd.right.isDown)
            {
              if(!this.rightDown){
              this.sprite.animations.play('right')
              this.animation='right'
            }
            this.rightDown = true

                this.sprite.body.velocity.x = this.speed;
            }
            if(cursors.right.isUp && wasd.right.isUp){
              this.rightDown = false
            }
          this.upDown
            if (cursors.up.isDown || wasd.up.isDown)
            {
              if(!this.upDown){
              this.sprite.animations.play('up')
              this.animation='up'
            }
            this.upDown = true
                this.sprite.body.velocity.y = -this.speed;
            }
            if(cursors.up.isUp && wasd.up.isUp){
              this.upDown = false
            }
            this.downDown
            if (cursors.down.isDown || wasd.down.isDown)
            {
              if(!this.downDown){
              this.sprite.animations.play('down')
              this.animation='down'
            }
            this.downDown = true
                this.sprite.body.velocity.y= this.speed;
            }
            if(cursors.down.isUp && wasd.down.isUp){
              this.downDown = false
            }

          if(cursors.down.isUp && cursors.up.isUp && cursors.left.isUp && cursors.right.isUp && wasd.down.isUp && wasd.up.isUp && wasd.left.isUp && wasd.right.isUp){
            if(this.animation !='idle' && this.animation !='attack' )
            this.sprite.animations.play('idle')
            this.animation='idle'
          }

      if (this.space.isDown){
          if(!this.onePress){
        if(this.bombs.length < this.limit ){
          let blockCoords = Utils.mapCoordsToBlock(this.x+10, this.y+20 )
          let gridCoords = Utils.mapCoordsToGrid(blockCoords.x,blockCoords.y)
             if(!(this.immuneTime > this.game.time.now)){

                if(!store.getState().Tiles.crates[gridCoords.x][gridCoords.y].bomb)
                {
                socket.emit('client_place_bomb', {x: blockCoords.x, y: blockCoords.y, range: this.range, socket: this.name, gridX: gridCoords.x, gridY: gridCoords.y, mySocket: socket.id, LobbyId: this.game.game.lobby.id})
                this.bomb = new MechaKoopa(this.game, blockCoords.x, blockCoords.y, this.range, socket.id);
                if(this.animation !='attack')
                this.sprite.animations.play('attack')
                this.animation='attack'
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
        // this.sprite.animations.play('walk')
      }
    }
    explosion(gridCoords, blockCoords, myBomb, time){
              myBomb.timer = this.game.time.events.add(Phaser.Timer.SECOND * time, () => {
                socket.emit('client_bomb_explode', {x: gridCoords.x, y: gridCoords.y, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id})
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
                      x: flameXY.x, y: flameXY.y, gridX: crate.x, gridY: crate.y, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id
                    })
                    let flame = this.fire.create(flameXY.x, flameXY.y, 'fire');
                    flame.animations.add('explode')
                    flame.animations.play('explode', 10, false)

                    flame.scale.setTo(.3,.3)
                    flame.anchor.setTo(0.5,0.5)
                    store.dispatch(addFlames(crate.x, crate.y, flame))
                    if(allCrates[crate.x][crate.y].bomb && allCrates[crate.x][crate.y].bomb !== myBomb){
                      this.game.time.events.remove(allCrates[crate.x][crate.y].bomb.timer)
                      socket.emit('client_delete_timer',{
                        x: crate.x, y: crate.y, socket: allCrates[crate.x][crate.y].bomb.socket, name: this.name , LobbyId: this.game.game.lobby.id
                      })
                      this.explosion({x: crate.x, y: crate.y}, {x: crate.x*48+24, y: crate.y*48+24}, allCrates[crate.x][crate.y].bomb, 0)
                    }

                  }

                let paintGrid = Utils.indexToXY(crate.x, crate.y);
                  if(allCrates[crate.x][crate.y].paint.key!==this.color){
                  socket.emit('client_make_paint', {
                      x: paintGrid.x, y: paintGrid.y, gridX: crate.x, gridY: crate.y, color: this.color, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id
                    })

                    let myPaint = this.paint.create(paintGrid.x, paintGrid.y, this.color)
                    myPaint.scale.setTo(0.15,0.15)
                    myPaint.anchor.setTo(0.5,0.5)
                    store.dispatch(addPaint(crate.x, crate.y,  myPaint))
                    store.dispatch(increaseScore())

                    store.dispatch(incrementMuliplayerScore(this.color));
                  }
                  if (allCrates[crate.x] && allCrates[crate.x][crate.y]&& allCrates[crate.x][crate.y].crate !== false) {
                    socket.emit('client_remove_crate',{x: crate.x, y: crate.y, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id})
                    // allCrates[crate.x][crate.y].crate.animations.add('crateExplosion_ANI')
                    // allCrates[crate.x][crate.y].crate.animations.play('crateExplosion_ANI', 10, false)
                    allCrates[crate.x][crate.y].crate.kill()

                    store.dispatch(removeCrate(crate.x, crate.y))
                    let powerUpChance = Math.floor(Math.random()*2.5)+1
                    let powerXY = Utils.indexToXY(crate.x, crate.y)
                    if(powerUpChance ===1){

                      //pick one of the 3 available powers up
                      const randomPowerUpArray = ['bombPowerUp', 'speedPowerUp', 'rangePowerUp']
                      let randomPowerUp = randomPowerUpArray[Math.floor(Math.random()*randomPowerUpArray.length)];

                      socket.emit('client_make_power', {
                          x: powerXY.x, y: powerXY.y, gridX: crate.x, gridY: crate.y, power: randomPowerUp, socket: this.name, mySocket: socket.id, LobbyId: this.game.game.lobby.id
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
        socket.emit('client_data_transfer', {position: this.sprite.position, color: this.color, score: this.score, name: this.name, animation: this.animation, id: this.game.game.lobby.id})
  }

}

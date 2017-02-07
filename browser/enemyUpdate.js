import store from './store'
import Hero from './class/hero1'
import socket from './socket'
import game from './states/stateManager'
import {crate, blockedLayer} from './states/game'
import {setMuliplayerScore} from './reducers/Scoreboard'


let enemies = {}
let me = {}


const updateEnemy = () =>{
let recievedEnemies = store.getState().Players.players
let currentClients = store.getState().Players.sockets

  Object.keys(enemies).forEach((key)=>{
    if(!recievedEnemies[key]){
      enemies[key].sprite.kill()
      delete enemies[key]
    }
  })

  Object.keys(recievedEnemies).forEach((key)=>{

    if(key !== socket.id ){

    let enemyExistBool = enemies[key] ? true: false
    if(enemyExistBool){
      enemies[key].sprite.x = recievedEnemies[key].position.x
      enemies[key].sprite.y = recievedEnemies[key].position.y
      enemies[key].sprite.animations.play('walk')
      store.dispatch(setMuliplayerScore(recievedEnemies[key].color, recievedEnemies[key].score))
    }

    if(!enemyExistBool){
enemies[key]=  new Hero(game, key, recievedEnemies[key].color)
  }
}


  })

  // EI: this should be in a separate file
  currentClients.forEach((key)=>{
    if(key === socket.id){
      if(me[key]){
        me[key].update(game)
        game.physics.arcade.collide(me[key].sprite, blockedLayer)
        game.physics.arcade.collide(me[key].sprite, crate)
      }
      if(!me[key]){
        let clientIndex = currentClients.indexOf(key)
        switch(clientIndex){
          case 0:
              me[key]= new Hero(game, key, 'blue')
          break
          case 1:
              me[key]= new Hero(game, key, 'purple')
          break
          case 2:
            me[key]= new Hero(game, key, 'green')
            break
            case 3:
            me[key]= new Hero(game, key, 'red')

            break
          default: break
        }


      }
    }
  })


}




export default updateEnemy

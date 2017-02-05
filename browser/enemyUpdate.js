import store from './store'
import Hero from './class/hero1'
import socket from './socket'
import game from './states/stateManager'

let enemies = {}


const updateEnemy = enemy =>{
let recievedEnemies = store.getState().Players.players

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
    }

    if(!enemyExistBool){
      console.log('this ran')
    enemies[key]=  new Hero(game, key)
  }
}

  })

}


export default updateEnemy

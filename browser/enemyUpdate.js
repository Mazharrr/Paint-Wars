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
  // console.log(store.getState().
  // let me = recievedEnemies[socket.id]

  Object.keys(recievedEnemies).forEach((key)=>{
    // console.log('key', key, 'socketid', socket.id)
    // console.log(recievedEnemies)
    // let me = recievedEnemies[socket.id]
    // console.log(me)
    if(key !== socket.id ){

    let enemyExistBool = enemies[key] ? true: false
    if(enemyExistBool){
      enemies[key].sprite.x = recievedEnemies[key].position.x
      enemies[key].sprite.y = recievedEnemies[key].position.y
      enemies[key].sprite.animations.play(recievedEnemies[key].animation)
    }

    if(!enemyExistBool){
      console.log('this ran')
    enemies[key]=  new Hero(game, key)
  }
}

  })

}





export default updateEnemy


// import store from './store'
// import Enemy from './class/enemy'
// import game from './states/stateManager'
//
// let enemies = {}
// let recievedEnemies = store.getState().Players.players
//
// const updateEnemy = enemy =>{
//   Object.keys(enemies).forEach((key)=>{
//     if(!recievedEnemies[key]){
//       enemies[key].kill()
//       delete enemies[key]
//     }
//   })
//   Object.keys(recievedEnemies).forEach((key)=>{
//     console.log(key)
//     enemies[key]=  new Enemy(game, recievedEnemies[key].position.x , recievedEnemies[key].position.y)
//
//   })
//
// }
// export default updateEnemy

import store from './store'
import MechaKoopa from './class/mechaKoopa'
import {getPlayers, getClient} from './reducers/Players'
import {loadLobby} from './reducers/Lobby'
import {removeBomb, addBomb, addFlames, removeCrate, addPaint, addPowerUp, removePaint, removePowerUp} from './reducers/Tiles'
import game from './states/stateManager'
import socket from './socket'
import {powerGroup, crate, fire, paint} from './states/game'

export default socket =>{
let me = socket.id
// console.log(store.getState().Player.id)
  socket.on('gameState', data=>{
    store.dispatch(getPlayers(data.Players.players))
    store.dispatch(getClient(data.Players.sockets))
  })
  socket.on('lobbyState', data=>{
    // console.log(data)
    store.dispatch(loadLobby(data.Lobby.lobby))
  })

  socket.on('server_bomb_explode', data=>{
    // console.log(me)
    // console.log(data.mySocket)
    // console.log(store.getState().Player)
    // console.log(store.getState().Player.id)
    // console.log(data.LobbyId)
    if(me!==data.mySocket && store.getState().Player.id ===data.LobbyId){
      // console.log('ran bomb explode')
    store.dispatch(removeBomb(data.x, data.y))
  }
  })
  socket.on('server_make_fire', data=>{
    if(me!==data.mySocket&& store.getState().Player.id ===data.LobbyId){
      let newFlame = fire.create(data.x, data.y, 'fire')
      flame.animations.add('explode')
      flame.animations.play('explode', 10, false)
      newFlame.scale.setTo(1.2,1.2)
      newFlame.anchor.setTo(0.5,0.5)
      store.dispatch(addFlames(data.gridX, data.gridY, newFlame))
  }
  })
  socket.on('server_remove_crate', data=>{
    if(me!==data.mySocket&& store.getState().Player.id ===data.LobbyId){
      if(store.getState().Tiles.crates[data.x][data.y].crate){
    store.getState().Tiles.crates[data.x][data.y].crate.kill()
    store.dispatch(removeCrate(data.x, data.y))
  }
  }
  })
  socket.on('server_make_paint', data=>{
    if(me!==data.mySocket&& store.getState().Player.id ===data.LobbyId){
      let newPaint = paint.create(data.x, data.y, data.color)
      newPaint.scale.setTo(0.15,0.15)
      newPaint.anchor.setTo(0.5,0.5)
      store.dispatch(addPaint(data.gridX, data.gridY, newPaint))
  }
  })
  socket.on('server_remove_paint', data=>{
    if(me!==data.mySocket&& store.getState().Player.id ===data.LobbyId){
    store.dispatch(removePaint(data.color))
  }
  })
  socket.on('server_get_power', data=>{
    console.log('getting power', data)
    if(me!==data.mySocket&& store.getState().Player.id ===data.LobbyId){
    store.dispatch(removePowerUp(data.x, data.y))
  }
  })
}

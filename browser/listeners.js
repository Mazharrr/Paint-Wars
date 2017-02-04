import store from './store'
import {getPlayers} from './reducers/players'

export default socket =>{
  socket.on('gameState', data=>{

    store.dispatch(getPlayers(data.Players.players))
  })
}

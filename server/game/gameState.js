const store = require('../store')

const sendGameState = io =>{
  setInterval(()=>{
    // console.log('my server store', store.getState())
    // console.log(store.getState())
    io.emit('gameState' , store.getState())
  }, 1000);


  setInterval(()=>{
    // console.log('my server store', store.getState())
    // console.log(store.getState())
    io.emit('lobbyState' , store.getState())
  }, 1000);


}

module.exports ={ sendGameState}

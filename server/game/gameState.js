const store = require('../store')

const sendGameState = io =>{
  setInterval(()=>{
    // console.log('my server store', store.getState())
    io.emit('gameState' , store.getState())
  }, 1000/60);
}

module.exports ={ sendGameState}

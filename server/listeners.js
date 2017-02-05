const store = require ('./store')
const {getClientData, deletePlayer} = require('./reducers/player')
const listeners =  function( io, socket){
  console.log('socket id:', socket.id)

  socket.on('disconnect', ()=>{
    console.log(socket.id + ' left the game');
    store.dispatch(deletePlayer(socket.id));
  })
  socket.on('client_data_transfer', (data)=>{
    store.dispatch(getClientData(socket.id, data))
  })
}
module.exports = listeners;

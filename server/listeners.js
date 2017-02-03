const store = require ('./store')
const {getClientData} = require('./reducers/player')
const listeners =  function( io, socket){
  console.log('socket id:', socket.id)

  socket.on('client_data_transfer', (data)=>{
    store.dispatch(getClientData(socket.id, data))
  })
}
module.exports = listeners;

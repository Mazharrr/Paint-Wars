const store = require ('./store')
const {getClientData, deletePlayer, addClient, removeClient} = require('./reducers/Player')
const listeners =  function( io, socket){
  console.log('socket id:', socket.id)
  socket.on('game_started', data =>{
    store.dispatch(addClient(socket.id))
  })

  socket.on('disconnect', ()=>{
    console.log(socket.id + ' left the game');
    store.dispatch(removeClient(socket.id))
    store.dispatch(deletePlayer(socket.id));
  })
  socket.on('client_data_transfer', (data)=>{
    store.dispatch(getClientData( data))
  })
  socket.on('client_place_bomb', (data)=>{
    io.emit('server_send_bomb', data)
  })
  socket.on('client_bomb_explode', (data)=>{
    io.emit('server_bomb_explode', data)
  })
  socket.on('client_make_fire', (data)=>{
    io.emit('server_make_fire', data)
  })
  socket.on('client_remove_crate', (data)=>{
    io.emit('server_remove_crate', data)
  })
  socket.on('client_make_paint', (data)=>{
    io.emit('server_make_paint', data)
  })
  socket.on('client_make_power', (data)=>{
    io.emit('server_make_power', data)
  })
  socket.on('client_remove_paint', (data)=>{
    io.emit('server_remove_paint', data)
  })
  socket.on('client_get_power', (data)=>{
    io.emit('server_get_power', data)
  })

}
module.exports = listeners;

const store = require ('./store')
const {getClientData, deletePlayer, addClient, removeClient} = require('./reducers/Player')

let lobbyMap = []
let randMap = []
let width = 15;
let height = 15;

function addMap(){
  let crateTable=[]
  for(let h = 0; h< height; h++){
    let crateRow = []
    for (let w = 0; w < width; w++){
      let tile = false
      if(h!==0 && w!==0 && h!==height-1 && w!==width-1 && (h%2==1 || w%2==1) ){
        if(!(h===1 && w===1) && !(h===height-2 && w===width-2 ) && !(h===1 && w== width-2)
        && !(h===height-2 && w===1) && !(h===2 && w===1) && !(h===1 && w===2) && !(h==height-2
          && w=== width-3) && !(h===height-3 && w=== width-2) && !(h===height-2 &&w===2) && !(h===height-3 && w==1)
          && ! (w===width-3 && h===1) && !(w===width-2 && h===2)){

               let randNum = Math.floor(Math.random()*w)
               let randNum1 = Math.floor(Math.random()*h)
              if( randNum % 2 !== 0 || randNum1 % 2 !== 0){
              tile = true
              }
            }
      }
        crateRow.push(tile)

    }

    crateTable.push(crateRow)

  }
  return crateTable
}


const listeners =  function( io, socket){
  console.log('socket id:', socket.id)
  socket.on('game_started', data =>{
    store.dispatch(addClient(socket.id))
    if(!lobbyMap[data.myId-1])
    lobbyMap[data.myId-1]= addMap()
    io.emit('load_crates', {table: lobbyMap[data.myId-1]})
  })

  socket.on('disconnect', ()=>{
    console.log(socket.id + ' left the game');
    store.dispatch(removeClient(socket.id))
    store.dispatch(deletePlayer(socket.id));
  })
  socket.on('client_data_transfer', (data)=>{
    store.dispatch(getClientData( data))
    io.emit('gameState', store.getState())
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
  socket.on('client_delete_timer', (data)=>{
    io.emit('server_delete_timer', data)
  })
  socket.on('client_create_crates', (data)=>{
    io.emit('server_create_crates', data)
  })

}
module.exports = listeners;

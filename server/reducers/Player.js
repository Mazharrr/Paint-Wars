const initialState = {
  players: {},
  sockets: []
}
const GET_CLIENT_DATA= 'GET_CLIENT_DATA'
const DELETE_PLAYER = 'DELETE_PLAYER'
const ADD_CLIENT = 'ADD_CLIENT'

const getClientData = (socketId, data)=>({
  type: GET_CLIENT_DATA,
  socketId,
  data
})

const addClient= socketId=>({
  type: ADD_CLIENT,
  id: socketId
})


const deletePlayer = (socketId)=>({
  type: DELETE_PLAYER,
  socketId
})

const playerReducer = (state = initialState, action)=>{
  let newState= Object.assign({},state)
  switch(action.type){
    case GET_CLIENT_DATA:
    console.log(action.data)
    newState.players[action.socketId] = action.data
    break;
    case DELETE_PLAYER:
    delete newState.players[action.socketId]
    break;
    case ADD_CLIENT:
    newState.sockets.push(action.id)
    break;

    default:
    return state
  }
  console.log(newState)
  return newState
}

module.exports= {getClientData, playerReducer, deletePlayer, addClient}

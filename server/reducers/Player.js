const initialState = {
  players: {}
}
const GET_CLIENT_DATA= 'GET_CLIENT_DATA'

const getClientData = (socketId, data)=>({
  type: GET_CLIENT_DATA,
  socketId,
  data
})

const playerReducer = (state = initialState, action)=>{
  let newState= Object.assign({},state)
  switch(action.type){
    case GET_CLIENT_DATA:
    newState.player[action.socketId] = action.data

    break;
    default:
    return state
  }
  return newState
}

module.exports= {getClientData, playerReducer}

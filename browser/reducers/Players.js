const initialState = {}


const GET_PLAYER = 'GET PLAYER'

export const getPlayers = players => ({
  type: GET_PLAYER,
  players
})

export default (state = initialState, action) =>{
  let newState = Object.assign({}, state)
  switch(action.type){
    case GET_PLAYER:

      newState.players = action.players
      break;
      default: return state
    }
    // console.log('playerData', action.players)
  return newState
}

const initialState = {}


const GET_PLAYER = 'GET PLAYER'

export const getPlayer = player => ({
  type: GET_PLAYER,
  player
})

export default (state = initialState, action) =>{
  let newState = Object.assign({}, state)
  switch(action.type){
    case GET_PLAYER:
      newState.player = action.player
      break;
      default: return state
    }
  return newState
}

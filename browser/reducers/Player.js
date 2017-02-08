const initialState = {
  name: "",
  avatar: "",
  score: 0,
  speed: 100,
  limit: 1,
  range: 1,
  id: 999999
}

//ACTION TYPE CONSTANTS

const ADD_PLAYER_NAME = "ADD_PLAYER_NAME";
const ADD_AVATAR = "ADD_AVATAR";
const INCREASE_SCORE = "INCREASE_SCORE";
const ADD_POWER_UP = "ADD_POWER_UP";
const KILL_PLAYER = "KILL_PLAYER";
const SET_LOBBY_ID= "SET_LOBBY_ID"

//ACTION CREATORS

export const setId= id=>({
  type: SET_LOBBY_ID,
  id
})

export const addPlayerName = (name) => ({
  type: ADD_PLAYER_NAME,
  name
})

export const addAvatar = (imageURL) => ({
  type: ADD_AVATAR,
  imageURL
})

export const increaseScore = () => ({
  type: INCREASE_SCORE
})

export const addToPlayerPowerUp = (powerUp) => ({
  type: ADD_POWER_UP,
  powerUp
})

export const killPlayer = () => ({
  type: KILL_PLAYER
})

//REDUCER

const reducer = (state = initialState, action) => {

  let newState = Object.assign({}, state)
  switch (action.type) {
    case ADD_PLAYER_NAME:
      newState.name = action.name;
      break;
    case ADD_AVATAR:
      newState.avatar = action.imageURL;
      break;
    case INCREASE_SCORE:
      newState.score++;
      break;
    case ADD_POWER_UP:
      if (action.powerUp === 'bombPowerUp') {
        newState.limit++
      }
      else if (action.powerUp === 'speedPowerUp') {
        newState.speed+=25
      }
      else if (action.powerUp === 'rangePowerUp'){
        newState.range++
      }
      break;
    case KILL_PLAYER:
      newState.score = initialState.score;
      newState.speed = initialState.speed;
      newState.limit = initialState.limit;
      newState.range = initialState.range;
      break;
      case SET_LOBBY_ID:
      // console.log('hit lobby set', action.id)
      newState.id=action.id
      break;
    default:
      return state;
  }
  return newState;
}

export default reducer;

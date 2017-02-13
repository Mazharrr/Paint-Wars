export const initialState = {
  green: {
    name:'',
    avatar: "http://www.fillmurray.com/100/100",
    score: 0
  },
  blue: {
    name:'',
    avatar: "http://www.fillmurray.com/101/101",
    score: 0
  },
  purple: {
    name:'',
    avatar: "http://www.fillmurray.com/102/102",
    score: 0
  },
  red: {
    name:'',
    avatar: "http://www.fillmurray.com/103/103",
    score: 0
  }
}

//ACTION TYPE CONSTANTS

export const ADD_MULTIPLAYER_NAME = "ADD_MULTIPLAYER_NAME";
export const ADD_PLAYER_AVATAR = "ADD_PLAYER_AVATAR";
export const INCREMENT_PLAYER_SCORE = "INCREMENT_PLAYER_SCORE";
export const SET_PLAYER_SCORE = "SET_PLAYER_SCORE";
export const RESET_PLAYER_SCORE = "RESET_PLAYER_SCORE";
export const RESTART_GAME = "RESTART_GAME";

//ACTION CREATORS

export const addMultiplayerAvatar = (color, imageURL) => ({
  type: ADD_PLAYER_AVATAR,
  color,
  imageURL
})

export const incrementMuliplayerScore = (color) => ({
  type: INCREMENT_PLAYER_SCORE,
  color
})
export const setMultiplayerScore = (color, score) => ({
  type: SET_PLAYER_SCORE,
  color,
  score
})

export const resetMultiplayerScore = (color) => ({
  type: RESET_PLAYER_SCORE,
  color
})

export const addNameMultiplayerScore = (color, name) => ({
  type: ADD_MULTIPLAYER_NAME,
  color,
  name
})

export const restartMultiplayerScoreboard = () => ({
  type: RESTART_GAME
})



//REDUCERS
const reducer = (state = initialState, action) => {
  let newState = Object.assign({}, state)
  let color = action.color
  switch (action.type) {
    case ADD_PLAYER_AVATAR:
      newState[color].avatar = action.imageURL;
      break;
    case INCREMENT_PLAYER_SCORE:
      newState[color].score++;
      break;
    case RESET_PLAYER_SCORE:
      newState[color].score = 0;
      break;
    case RESTART_GAME:
      newState = initialState;
      break;
    case SET_PLAYER_SCORE:
      newState[color].score = action.score;
      break;
    case ADD_MULTIPLAYER_NAME:

      newState[color].name = action.name;
      break;
    default:
      return state;
  }
  //console.log(newState)
  return newState;

};

export default reducer;

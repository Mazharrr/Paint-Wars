const initialState = {
  green: {
    avatar: "http://www.fillmurray.com/100/100",
    score: 0
  },
  blue: {
    avatar: "http://www.fillmurray.com/101/101",
    score: 0
  },
  purple: {
    avatar: "http://www.fillmurray.com/102/102",
    score: 0
  },
  red: {
    avatar: "http://www.fillmurray.com/103/103",
    score: 0
  }
}

//ACTION TYPE CONSTANTS

const ADD_PLAYER_AVATAR = "ADD_PLAYER_AVATAR";
const INCREMENT_PLAYER_SCORE = "INCREMENT_PLAYER_SCORE";
const SET_PLAYER_SCORE = "SET_PLAYER_SCORE";
const RESET_PLAYER_SCORE = "RESET_PLAYER_SCORE";
const RESTART_GAME = "RESTART_GAME";

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
export const setMuliplayerScore = (color, score) => ({
  type: SET_PLAYER_SCORE,
  color,
  score
})

export const resetMultiplayerScore = (color) => ({
  type: RESET_PLAYER_SCORE,
  color
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
      newState[color].score = action.score
      break;
    default:
      return state;
  }
  return newState;

}

export default reducer;

const initialState = {
  lobby: []
};
const SET_LOBBY = "SET_LOBBY";
const setLobby = lobby => ({
  type: SET_LOBBY,
  lobby
});

const LobbyReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case SET_LOBBY:
      newState.lobby = action.lobby;
      break;
    default:
      return state;
  }
  return newState;
};

module.exports = { LobbyReducer, setLobby };

const initialState = {};
const GET_PLAYER = "GET_PLAYER";
const GET_CLIENT = "GET_CLIENT";

export const getPlayers = players => ({
  type: GET_PLAYER,
  players
});

export const getClient = sockets => ({
  type: GET_CLIENT,
  sockets
});

export default (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_PLAYER:
      newState.players = action.players;
      break;
    case GET_CLIENT:
      newState.sockets = action.sockets;
      break;

    default:
      return state;
  }
  return newState;
};

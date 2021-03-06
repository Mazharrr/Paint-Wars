const initialState = {
  players: {},
  sockets: []
};
const GET_CLIENT_DATA = "GET_CLIENT_DATA";
const DELETE_PLAYER = "DELETE_PLAYER";
const ADD_CLIENT = "ADD_CLIENT";
const REMOVE_CLIENT = "REMOVE_CLIENT";

const getClientData = data => ({
  type: GET_CLIENT_DATA,
  data
});

const addClient = socketId => ({
  type: ADD_CLIENT,
  id: socketId
});
const removeClient = socketId => ({
  type: REMOVE_CLIENT,
  id: socketId
});

const deletePlayer = socketId => ({
  type: DELETE_PLAYER,
  socketId
});

const playerReducer = (state = initialState, action) => {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_CLIENT_DATA:
      newState.players[action.data.name] = action.data;
      break;
    case DELETE_PLAYER:
      delete newState.players[action.socketId];
      break;
    case ADD_CLIENT:
      newState.sockets.push(action.id);
      break;
    case REMOVE_CLIENT:
      newState.sockets = newState.sockets.filter(val => val !== action.id);
      break;

    default:
      return state;
  }
  return newState;
};

module.exports = {
  getClientData,
  playerReducer,
  deletePlayer,
  addClient,
  removeClient
};

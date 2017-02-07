const {combineReducers} = require('redux')
const Players = require('./Player').playerReducer
const Lobby = require('./Lobby').LobbyReducer

module.exports = combineReducers({
  Players: Players,
  Lobby: Lobby
})

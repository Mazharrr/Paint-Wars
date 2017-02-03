const {combineReducers} = require('redux')
const Player = require('./Player').playerReducer

module.exports = combineReducers({
  Player: Player
})

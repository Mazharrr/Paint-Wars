const {combineReducers} = require('redux')
const Players = require('./Player').playerReducer

module.exports = combineReducers({
  Players: Players
})

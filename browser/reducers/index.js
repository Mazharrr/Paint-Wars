import {combineReducers} from 'redux'
import Players from './Players'

import Tiles from './Tiles'
import Lobby from './Lobby'
import Player from './Player'

export default combineReducers({
  Tiles,
  Player,
  Players,
  Lobby
})

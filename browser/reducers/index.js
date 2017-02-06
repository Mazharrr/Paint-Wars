import {combineReducers} from 'redux'
import Players from './Players'

import Tiles from './Tiles';
import Player from './Player';
import Scoreboard from './Scoreboard';

export default combineReducers({
  Tiles,
  Player,
  Players,
  Scoreboard
})

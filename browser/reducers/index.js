import {combineReducers} from 'redux'
import Classes from './Classes'
import Players from './Players'

export default combineReducers({
  Classes: Classes,
  Players: Players
})

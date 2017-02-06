import axios from 'axios'
import {hashHistory} from 'react-router';


const initialState = {
lobby : [],
}

const LOAD_LOBBY = 'LOAD_LOBBY'

const loadLobby=  (lobby)=>({
  type: LOAD_LOBBY,
  lobby
})


export const getLobby = ()=>{
  return function(dispatch,getState){
    axios.get('/api/lobby')
      .then(res=>res.data)
      .then(lobby => {dispatch(loadLobby(lobby))})
      .catch(err=>console.error(err))
  }
}

export const makeRoom = ()=>{
  return function(dispatch, getState){
    axios.post('/api/lobby')
    .then(res=>res.data)
    .then(lobby => {dispatch(loadLobby(lobby))})
  }
}

const reducer =  (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_LOBBY:
    newState.lobby = action.lobby
    break;
    default:
      return state;
  }
  return newState;
}

export default reducer

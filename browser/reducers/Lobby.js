import axios from 'axios'
import {hashHistory} from 'react-router';

const initialState = {
  lobby : [],
  timer: ''
}

const LOAD_LOBBY = 'LOAD_LOBBY'
const LOAD_TIMER = 'LOAD_TIMER'

export const loadLobby=  (lobby)=>({
  type: LOAD_LOBBY,
  lobby
})

export const loadTimer=  (timer)=>({
  type: LOAD_TIMER,
  timer
})



export const getLobby = ()=>{
  console.log("get day lobby")
  return function(dispatch,getState){
    axios.get('/api/lobby')
      .then(res=>res.data)
      .then(lobby => {dispatch(loadLobby(lobby))})
      .catch(err=>console.error(err))
  }
}

export const makeRoom = (name)=>{

  return function(dispatch, getState){
    axios.post('/api/lobby', {name: name})
    .then(res=>res.data)
    .then(lobby => {dispatch(loadLobby(lobby))})
  }
}

export const joinRoom = (roomId, name)=>{
  return function(dispatch, getState){
    axios.post(`/api/lobby/${roomId}`, {name: name})
    .then(res=>res.data)
    .then(lobby => {dispatch(loadLobby(lobby))})
  }
}

export const leaveRoom = (roomId, name)=>{
  return function(dispatch,getState){
    console.log(`api/lobby/${roomId}/${name}`)
    axios.delete(`api/lobby/${roomId}/${name}`)
    // .then() ... ?
  }
}

const reducer =  (state = initialState, action) => {
  let newState = Object.assign({}, state)
  switch (action.type) {
    case LOAD_LOBBY:
      newState.lobby = action.lobby
      break;
    case LOAD_TIMER:
      newState.timer = action.timer
      break;
    default:
      return state;
  }
  return newState;
}

export default reducer

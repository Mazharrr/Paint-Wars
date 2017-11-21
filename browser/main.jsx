import ReactDOM from 'react-dom'
import React from 'react'
import {Router, Route, IndexRedirect, hashHistory} from 'react-router'
import {render} from 'react-dom'
import {connect, Provider} from 'react-redux'
import axios from 'axios'
import App from './containers/App'
import Game from './containers/Game'
import Lobby from './containers/Lobby'
import Intro from './containers/Intro'
import {getLobby} from './reducers/Lobby'
import {addPlayerN} from './reducers/Player'
import store from './store'

const onAppEnter = (nextState, replaceState)=>{
  axios.get('/api/lobby')
  .then(()=>{
    return axios.get('/api/name')
  })
  .then(res=>res.data)
  .then(name=>{
    store.dispatch(addPlayerN(name.name))
    return name.name
  })
  .then((name)=>{
    if(name === "" || name === undefined){
      hashHistory.push('/home')
    }

  })

}

ReactDOM.render(

  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/" component={App}  >
      	<IndexRedirect to="/home" />
       	<Route path="/home" component={Intro}  />
        <Route path="/lobby" component={Lobby}  onEnter={onAppEnter}/>
        <Route path="/game" component={Game} onEnter={onAppEnter} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('main')
)
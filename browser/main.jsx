// import React from 'react'
import ReactDOM from 'react-dom'
// import {Provider} from 'react-redux'
// import App from './components/App'

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

// import 'pixi';
// import 'p2';
// import 'phaser';
// import game from './states/stateManager'
import store from './store'

const onAppEnter = (nextState, replaceState)=>{
  axios.get('/api/lobby')
  .then(()=>{
    return axios.get('/api/name')
  })
  .then(res=>res.data)
  .then(name=>{
    console.log(name)
    store.dispatch(addPlayerN(name.name))
    return name.name
  })
  .then((name)=>{
    console.log(name)
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

 // <IndexRedirect to="/products" />
 //        <Route path="/products" component={ProductsContainer} onEnter={onProductsEnter} />
 //        <Route path="/products/category/:categoryId" component={ProductsContainer} onEnter={onCategoryEnter} />
 //        <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter} />
 //        <Route path="/products/:productId/reviews" component={ReviewsContainer} onEnter={onReviewsEnter} />
 //        <Route path="/products/:productId" component={ProductContainer} onEnter={onProductEnter}/>
 //        <Route path="/cart" component={CartContainer} />

 //        <Route path="/orders" component={OrdersContainer} onEnter={onOrdersEnter}/>
 //        {/* <Route path="/checkout" component={CheckoutContainer} onEnter={onCheckoutEnter} /> */}
 //        <Route path="/whoami" component={WhoAmI} />
 //        <Route path="/login" component={Login} />

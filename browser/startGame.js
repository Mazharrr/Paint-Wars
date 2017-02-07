// import React from 'react'
// import ReactDom from 'react-dom'
// import {Provider} from 'react-redux'
// import App from './components/App'

import 'pixi';
import 'p2';
import 'phaser';
import {initializeSocket} from './socket'

import game from './states/stateManager'
import store from './store'

initializeSocket();

'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const app = express()
const fs = require('fs')
const socketio = require('socket.io');
const server = require('http').createServer(app)
const io = socketio(server);
const listeners =  require('./listeners')
const {sendGameState} = require('./game/gameState')

// server.on('request', app)

io.on('connection', socket =>{listeners(io,socket)})
sendGameState(io)





  module.exports = app
  .use(require('volleyball'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(require('cookie-session') ({
    name: 'session',
    keys: [process.env.SESSION_SECRET || 'an insecure secret key']
  }))
    .use(express.static(resolve(__dirname, '..', 'public')))
    .use(express.static(resolve(__dirname, '..', 'node_modules/phaser/build/')))
    .use('/api', require('./api'))
    .get('/', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))
  .use((err, req,res,next )=>{
    console.error(err)
  })



  server.listen( process.env.PORT || 1337, function () {
      console.log('The server is listening on port 1337!');
  });

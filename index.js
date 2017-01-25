'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const {resolve} = require('path')
const app = express()
const fs = require('fs')
const socketio = require('socket.io');
var server = require('http').createServer(app)


const io = socketio(server);



  module.exports = app
  .use(require('volleyball'))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, 'public')))
  .use(express.static(resolve(__dirname, 'node_modules/phaser/build/')))
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, 'public', 'index.html')))



  server.listen( process.env.PORT || 1337, function () {
      console.log('The server is listening on port 1337!');
  });

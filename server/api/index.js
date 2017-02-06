'use strict'
const express = require('express')
const router = express.Router();

let Lobby = []
let roomId = 1

module.exports = router;

router.get('/lobby', (req,res,next)=>{
  res.json(Lobby)
})
router.post('/lobby' ,(req,res,next)=>{
  Lobby.push({id: roomId, players: []})
  roomId++;
  // res.json(Lobby[Lobby.length-1])
  res.json(Lobby)
})
router.post('/lobby/:roomId',(req,res,next)=>{
  currentRoom = Lobby.filter((room)=>room.id===req.params.roomId)
  currentRoom[0].players.push(req.body.name)
})
router.get('/lobby/:roomId', (req,res,next)=>{
  currentRoom = Lobby.filter((room)=>room.id===req.params.roomId)
  res.json(currentRoom[0])
})

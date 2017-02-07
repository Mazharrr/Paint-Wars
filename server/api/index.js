'use strict'
const express = require('express')
const router = express.Router();
const {setLobby} = require('../reducers/Lobby')
const store = require('../store')

let Lobby = []
let roomId = 1

module.exports = router;

router.use((req,res,next)=>{
  store.dispatch(setLobby(Lobby))
  console.log(Lobby)
  next()
})

router.get('/lobby', (req,res,next)=>{
  res.json(Lobby)
})
router.post('/lobby' ,(req,res,next)=>{

  let multiple=  false
  Lobby.forEach((room)=>{
    if(room.players.includes(req.body.name))
    multiple = true
  })
  if(!multiple)
  {Lobby.push({id: roomId, players: [req.body.name]})
  roomId++;
  }
  res.json(Lobby)
})
router.post('/lobby/:roomId',(req,res,next)=>{
  let currentRoom = Lobby.filter((room)=>room.id=== +req.params.roomId)
  currentRoom[0].players.push(req.body.name)
  res.json(Lobby)
})
router.get('/lobby/:roomId', (req,res,next)=>{
  let currentRoom = Lobby.filter((room)=>room.id===req.params.roomId)
  res.json(currentRoom[0])
})
router.delete('/lobby/:roomId/:playerName', (req,res,next)=>{
let currentRoom;
currentRoom;
Lobby.forEach((val, index)=>{
  if(val.id=== +req.params.roomId)
  currentRoom = index
})

console.log(currentRoom)
let currentPlayer =Lobby[currentRoom].players.indexOf(req.params.playerName)
console.log(currentPlayer)
console.log(Lobby)
Lobby[currentRoom].players.splice(currentPlayer,1)
console.log(Lobby)

if(Lobby[currentRoom].players.length === 0) {
  Lobby.splice(currentRoom, 1)

}

})
// router.delete('lobby/:roomId/:playerId', (req,res,next)=>{
// lobby[req.params.id] =  lobby[req.params.id]
// })

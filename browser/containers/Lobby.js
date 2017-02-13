import React from 'react';
import {Link, hashHistory} from 'react-router'
import { connect } from 'react-redux';
import {makeRoom, joinRoom, leaveRoom, startRoom} from '../reducers/Lobby'
import Header from '../containers/Header';


import 'pixi';
import 'p2';
import 'phaser';
import game from '../states/stateManager'


const Lobby = (props)=>{

    let multiple=  false
    let myRoom
    props.Lobby.lobby.forEach((room)=>{
      if(room.players.includes(props.Player.name))
      multiple = true
    })
    props.Lobby.lobby.forEach((room)=>{
      if(room.players.includes(props.Player.name))
      myRoom = room
    })
    let inGame
    if(myRoom && myRoom.start){
      var myGame = new game(myRoom)
      hashHistory.push('/game')
      inGame=true
    }





  return(

    <div className="container">
      <Header />
      <div className="row">
        <div className="rpgui-content">
          <form className="rpgui-container framed customForm">
      <button onClick={(e)=>{
        e.preventDefault()
        props.makeRoom(props.Player.name)}} disabled={multiple}>Make a room </button>
      <h1>Room count: {props.Lobby.lobby && props.Lobby.lobby.length}</h1>

    <h3>Rooms</h3>
      {
        props.Lobby.lobby && props.Lobby.lobby.map(room => (
          !room.start ? <div key= { room.id}>
            <h1>Room {room.id}</h1>
             {
               room.players.map((player, index )=>

                 <div key = {index}>
                   <h3>
                      Player {index+1} - {player}
                   </h3>

                 </div>
               )
             }
             {
               (room.players && room.players.length>=2 && room.players.includes(props.Player.name))
               ? <button onClick={(e)=>{
                 e.preventDefault()
                 store.dispatch(startRoom(room.id))
                 var myGame = new game(myRoom)
                 hashHistory.push('/game')
               }}>Start Game</button>
                : (room.players && room.players.length <4) ?<button  disabled = {multiple ||room.start} onClick ={(e)=>{
                  e.preventDefault()
                  props.joinRoom(room.id, props.Player.name)}}>Join Room
                </button>: <div></div>
             }
             {(room.players.includes(props.Player.name))
               ?
               <button onClick={()=>props.leaveRoom(room.id, props.Player.name)}>Leave Room</button>
               :<div></div>
             }
             <hr></hr>
          </div>: <div key ={room.id}></div>
        ))
      }
    </form>
      </div>
    </div>
  </div>


  )

}


const mapStateToProps = (state) => ({
Lobby: state.Lobby, Player: state.Player})

const mapDispatchToProps = (dispatch) => ({
  makeRoom: (playerName) => dispatch(makeRoom(playerName)),
  joinRoom: (roomId, playerName) => dispatch(joinRoom(roomId, playerName)),
  leaveRoom: (roomId, name) => dispatch(leaveRoom(roomId,name)),
  startRoom: (roomId) => dispatch(startRoom(roomId))
})


export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

import React from 'react';
import { Link } from 'react-router'
import { connect } from 'react-redux';
import { makeRoom, joinRoom, leaveRoom } from '../reducers/Lobby'

const Lobby = props => {
  let multiple = false
  props.Lobby.lobby.forEach((room)=>{
    if(room.players.includes(props.Player.name))
    multiple = true
  })

  return (
    <div>
      <button
        onClick={() => props.makeRoom(props.Player.name)}
        disabled={multiple}>Make a room</button>
      <h1>Room count: {props.Lobby.lobby && props.Lobby.lobby.length}</h1>
      <h3>Rooms</h3>
      {
        props.Lobby.lobby && props.Lobby.lobby.map(room => (
          <div key= { room.id}>
            <Link to={`/lobby/${room.id}`}>Room {room.id}</Link>
             {
               room.players.map((player, index) => (
                 <div key = {index}>
                   <h3>Player {index + 1} - {player}</h3>
                 </div>
                ))
             }
             <button
              disabled = {multiple}
              onClick ={() => props.joinRoom(room.id, props.Player.name)}>Join Room</button>
             <button
              onClick={()=> props.leaveRoom(room.id, props.Player.name)}>Leave Room</button>
             <hr></hr>
          </div>
        ))
      }
    </div>
  )
}

const mapStateToProps = (state) => ({
Lobby: state.Lobby, Player: state.Player})

const mapDispatchToProps = (dispatch) => ({
  makeRoom: (playerName) => dispatch(makeRoom(playerName)),
  joinRoom: (roomId, playerName) => dispatch(joinRoom(roomId, playerName)),
  leaveRoom: (roomId, name) => dispatch(leaveRoom(roomId,name))
})

export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

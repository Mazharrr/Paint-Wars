import React from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux';
import {makeRoom} from '../reducers/Lobby'

const Lobby = (props)=>{
  return(
    <div>
      <button onClick={()=>props.makeRoom()}>make a room </button>
      <h1>Room count: {props.Lobby.lobby && props.Lobby.lobby.length}</h1>

    <h3>Rooms</h3>
      {
        props.Lobby.lobby && props.Lobby.lobby.map(room => (
          <div key= { room.id}>
            <Link to={`/lobby/${room.id}`}>Room {room.id}</Link>

             {
               room.players.forEach(player => (
                <div >
                   <h3>

                   </h3>
                 </div>
               ))
             }
          </div>
        ))
      }
    </div>



  )

}


const mapStateToProps = (state) => ({
Lobby: state.Lobby})

const mapDispatchToProps = (dispatch) => ({
  makeRoom: () => dispatch(makeRoom())
})


export default connect(mapStateToProps, mapDispatchToProps)(Lobby);

import React from 'react';
import { connect } from 'react-redux';
import GameStart from '../startGame';
//import socket


const scoreBoard = (props) => {
  let player = props.player;
  return (
    <div className="row">
      <div className="col-xs-8">

      </div>
      <div className="col-xs-4">
        <div>
          {
            player.name &&
            <h1>
              {player.name}
            </h1>
          }
          <div>
            <img src={player.avatar}></img>

          </div>
          <h1>
            Score: {player.score}
          </h1>
          <h1>
            Speed: {player.speed}
          </h1>
          <h1>
            Bomb Quantity: {player.limit}
          </h1>
          <h1>
            Power: {player.range}
          </h1>

        </div>
      </div>

    </div>
  )


}

const mapStateToProps = (state) => ({
  player: state.Player
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(scoreBoard);

import React from 'react';
import { connect } from 'react-redux';
import GameStart from '../startGame';
//import socket
let winner;

const scoreBoard = (props) => {
  let player = props.player;
  let lobby = props.lobby;

  let {green, blue, purple, red} = props.scoreboard;
  	
  	
  	
  	if (lobby.timer === 'Done!') { 
  		Object.keys(props.scoreboard).forEach( player => {
  			// console.log(player, player.score);
  			if(!winner){
  				// console.log(winner);
  				winner = props.scoreboard[player];
  				// console.log(winner);
  			}	

  			if(winner.score <= props.scoreboard[player].score){
  				winner = props.scoreboard[player];
  			}
  		});

  		console.log(winner)
  		
  		
       
  		return (
    <div className="container-fluid">


      <div className="row">
        <div className="col-md-8">

        </div>
        <div className="col-md-4">

        </div>

      </div>
      <div className="row">
        <div className="col-xs-8">
          
        </div>
        <div className="col-xs-4">

        </div>
      </div>
      <div className="row">
        <div className="col-xs-8"></div>
        <div className="rpgui-content col-xs-4">
          <div className="rpgui-container framed">
              {
                player.name &&
                <div>
	                <h1>
	                  WINNER:
	                </h1>
	                <h2>
	                  {winner.name}
	                </h2>
                </div>
              }
          </div>
        </div>
      </div>

    </div>
  )


  	 }else {

  return (
    <div className="container-fluid">


      <div className="row">
        <div className="col-md-8">

        </div>
        <div className="col-md-4">

        </div>

      </div>
      <div className="row">
        <div className="col-xs-8">
          <table>
            <tr>
              <th>
                <img src={green.avatar}></img> : {green.score}
              </th>
              <th>
                <img src={blue.avatar}></img> : {blue.score}
              </th>
              <th>
                <img src={purple.avatar}></img> : {purple.score}
              </th>
              <th>
                <img src={red.avatar}></img> : {red.score}
              </th>
            </tr>
            <tbody>

            </tbody>
          </table>

        </div>
        <div className="col-xs-4">

        </div>
      </div>
      <div className="row">
        <div className="col-xs-8"></div>
        <div className="rpgui-content col-xs-4">
          <div className="rpgui-container framed">
              {
                player.name &&
                <h1>
                  {player.name}
                </h1>
              }
              <h1>
                Score: {player.score}
              </h1>
              <h1>
                Time: {lobby.timer}
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

    </div>
  )

 }
}

const mapStateToProps = (state) => ({
  player: state.Player,
  scoreboard: state.Scoreboard,
  lobby: state.Lobby
})

const mapDispatchToProps = (dispatch) => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(scoreBoard);

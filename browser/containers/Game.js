import React from 'react';
import { connect } from 'react-redux';
import {Link } from 'react-router'
let winner;

const scoreBoard = (props) => {
  let player = props.player;
  let lobby = props.lobby;

  let { green, blue, purple, red } = props.scoreboard;

  	if (lobby.timer === 'Done!') {
      let finalScores = [green, blue, purple, red].sort((playerA, playerB) => {return playerB.score - playerA.score})
      // this was the previous logic for just showing the winner of the game
      // Object.keys(props.scoreboard).forEach( player => {
  		// 	// console.log(player, player.score);
  		// 	if(!winner){
  		// 		// console.log(winner);
  		// 		winner = props.scoreboard[player];
  		// 		// console.log(winner);
  		// 	}
      //
  		// 	if(winner.score <= props.scoreboard[player].score){
  		// 		winner = props.scoreboard[player];
  		// 	}
  		// });
  		// console.log(winner)





  		return (
		    <div className="container-fluid">
		      <div className="row">
		        <div className="col-xs-2"></div>
		        <div className="rpgui-content col-xs-8">
              <div className="rpgui-container framed">
                <div className="row">
                  {
                    finalScores.map((player, i) => {
                      if (player.name) {
                        return (
                          <div key={i} className="col-xs-3">
                            {
                              i === 0 ? <h1>Winner!</h1> : <h1>Loser!</h1>
                            }
                            <h2>{player.name}</h2>
                            <img className="winnerAvatar" src={player.avatar}></img>
                            <h2>Score:</h2>
                            <h2>{player.score}</h2>
                          </div>
                        )
                      }
                    })
                  }
		            </div>
		          </div>
		        </div>
            <div className="col-xs-2"></div>
		      </div>
		    </div>
		)


  }
  else {

  return (
    <div className="container-fluid">
      <div className="row">
      	<div className="col-xs-4"></div>
      	<div className="col-xs-4"></div>
      	<div className="col-xs-4"></div>
      </div>
      <div className="row">
        <div className="col-xs-3">
        	<div className="rpgui-content">
        		<div className="rpgui-container framed whiteText">
    			  <table>
		            <tr>
		              <th className="whiteText">
		                <img className="scoreBoardAvatar" src="http://vignette4.wikia.nocookie.net/ssb/images/5/56/Yoshi_%2B_Egg_1.png/revision/latest?cb=20140929214641&format=webp"></img> :  {green.score}
		              </th>
		            </tr>
		            <tr>
	            	  <th className="whiteText">
		                <img className="scoreBoardAvatar" src="http://vignette1.wikia.nocookie.net/ssb/images/0/03/LarryTrophy3DS.png/revision/latest?cb=20140929194701&format=webp"></img> : {blue.score}
		              </th>
		            </tr>
		            <tr>
		              <th className="whiteText">
		                <img className="scoreBoardAvatar" src="http://vignette3.wikia.nocookie.net/ssb/images/4/4a/LemmyTrophy3DS.png/revision/latest?cb=20140929194817&format=webp"></img> : {purple.score}
		              </th>
		            </tr>
		            <tr>
			          <th className="whiteText">
			            <img className="scoreBoardAvatar" src="http://vignette4.wikia.nocookie.net/ssb/images/e/e1/BowserJrEXTrophy3DS.png/revision/latest?cb=20140929203914&format=webp"></img> : {red.score}
		              </th>
		            </tr>
		          </table>
        		</div>
        	</div>
        </div>

        <div className="col-xs-6 ">
        </div>

        <div className="col-xs-3">
        </div>
      </div>

      <div className="row">
        <div className="col-xs-3">

        </div>
        <div className="col-xs-6">
        	<div id="gameContainer"></div>

        </div>

        <div className="col-xs-3">
          <div className="rpgui-content col-xs-2">
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

import React from "react";
import { connect } from "react-redux";
import GameStart from "../startGame";

const scoreBoard = props => {
  let player = props.player;
  let lobby = props.lobby;

  let { green, blue, purple, red } = props.scoreboard;
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-8" />
        <div className="col-md-4" />
      </div>
      <div className="row">
        <div className="col-xs-8">
          <table>
            <tr>
              <th>
                <img src={green.avatar} /> : {green.score}
              </th>
              <th>
                <img src={blue.avatar} /> : {blue.score}
              </th>
              <th>
                <img src={purple.avatar} /> : {purple.score}
              </th>
              <th>
                <img src={red.avatar} /> : {red.score}
              </th>
            </tr>
            <tbody />
          </table>
        </div>
        <div className="col-xs-4" />
      </div>
      <div className="row">
        <div className="col-xs-8" />
        <div className="rpgui-content col-xs-4">
          <div className="rpgui-container framed viewport-center">
            {player.name &&
              <h1>
                {player.name}
              </h1>}
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
  );
};

const mapStateToProps = state => ({
  player: state.Player,
  scoreboard: state.Scoreboard,
  lobby: state.Lobby
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(scoreBoard);

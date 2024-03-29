import store from "./store";
import MechaKoopa from "./class/mechaKoopa";
import { getPlayers, getClient } from "./reducers/Players";
import { decreaseScore } from "./reducers/Player";
import { loadLobby } from "./reducers/Lobby";
import {
  removeBomb,
  addBomb,
  addFlames,
  removeCrate,
  addPaint,
  addPowerUp,
  removePaint,
  removePowerUp
} from "./reducers/Tiles";
import game from "./states/stateManager";
import socket from "./socket";
import { decrementMuliplayerScore } from "./reducers/Scoreboard";
import { powerGroup, crate, fire, paint } from "./states/game";

export default socket => {
  let me = socket.id;
  socket.on("gameState", data => {
    store.dispatch(getPlayers(data.Players.players));
    store.dispatch(getClient(data.Players.sockets));
  });
  socket.on("lobbyState", data => {
    store.dispatch(loadLobby(data.Lobby.lobby));
  });

  socket.on("server_bomb_explode", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      store.dispatch(removeBomb(data.x, data.y));
    }
  });
  socket.on("server_make_fire", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      let newFlame;
      switch (data.color) {
        case "blue":
          newFlame = fire.create(data.x, data.y, "blueFire");
          break;
        case "green":
          newFlame = fire.create(data.x, data.y, "greenFire");
          break;
        case "purple":
          newFlame = fire.create(data.x, data.y, "purpleFire");
          break;
        case "red":
          newFlame = fire.create(data.x, data.y, "redFire");
          break;
        default:
          break;
      }
      newFlame.animations.add("explode");
      newFlame.animations.play("explode", 50, false);
      newFlame.body.setSize(48, 48, 0, 0);
      newFlame.scale.setTo(0.5, 0.5);
      newFlame.anchor.setTo(0.5, 0.5);
      store.dispatch(addFlames(data.gridX, data.gridY, newFlame));
    }
  });
  socket.on("server_remove_crate", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      if (store.getState().Tiles.crates[data.x][data.y].crate) {
        store.getState().Tiles.crates[data.x][data.y].crate.kill();
        store.dispatch(removeCrate(data.x, data.y));
      }
    }
  });
  socket.on("server_make_paint", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      let newPaint = paint.create(data.x, data.y, data.color);
      newPaint.scale.setTo(0.15, 0.15);
      newPaint.anchor.setTo(0.5, 0.5);
      let myName = store.getState().Player.name;
      let myColor;
      data.Lobby.players.forEach((key, i) => {
        if (myName === key) {
          switch (i) {
            case 0:
              myColor = "blue";
              break;
            case 1:
              myColor = "purple";
              break;
            case 2:
              myColor = "green";
              break;
            case 3:
              myColor = "red";
              break;
            default:
              break;
          }
        }
      });
      if (
        store.getState().Tiles.crates[data.gridX][data.gridY].paint &&
        store.getState().Tiles.crates[data.gridX][data.gridY].paint.key ===
          myColor
      ) {
        store.dispatch(decreaseScore());
        store.dispatch(decrementMuliplayerScore(myColor));
      }
      store.dispatch(addPaint(data.gridX, data.gridY, newPaint));
    }
  });
  socket.on("server_remove_paint", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      store.dispatch(removePaint(data.color));
    }
  });
  socket.on("server_get_power", data => {
    if (me !== data.mySocket && store.getState().Player.id === data.LobbyId) {
      store.dispatch(removePowerUp(data.x, data.y));
    }
  });
};

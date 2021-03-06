import Hero from "../class/hero";
import store from "../store";
import socket from "../socket";
import { loadCrates, addPlayer, addBomb, addPowerUp } from "../reducers/Tiles";
import { loadTimer } from "../reducers/Lobby";
import { setMultiplayerScore } from "../reducers/Scoreboard";
import MechaKoopa from "../class/mechaKoopa";
import { setId } from "../reducers/Player";

export let player;
export let powerGroup;
export let crate;
export let fire;
export let paint;
export let blockedLayer;
export let timer, timerEvent, text;
let enemies = {};
let me = {};
let name;
let amountMade = 0;
let bool = false;
let myId;
let coordCheckTimer = 0;

import { initializeSocket } from "../socket";
initializeSocket();

export default class gameState extends Phaser.State {
  constructor() {
    super();
  }
  create() {
    name = store.getState().Player.name;
    myId = this.game.lobby.id;
    store.dispatch(setId(myId));
    socket.on("server_send_bomb", data => {
      if (name !== data.socket && myId === data.LobbyId) {
        let newBomb = new MechaKoopa(
          this,
          data.x,
          data.y,
          data.range,
          data.mySocket
        );
        newBomb.sprite.animations.play("explodeLeft");
        store.dispatch(addBomb(data.gridX, data.gridY, newBomb));
      }
    });
    socket.on("server_make_power", data => {
      if (name !== data.socket && myId === data.LobbyId) {
        if (store.getState().Tiles.crates[data.gridX][data.gridY].powerUp) {
          store.getState().Tiles.crates[data.gridX][data.gridY].powerUp.kill();
          store.getState().Tiles.crates[data.gridX][data.gridY].powerUp = false;
        }

        let newPower = powerGroup.create(data.x, data.y, data.power);
        newPower.scale.setTo(1.3, 1.3);
        newPower.anchor.setTo(0.5, 0.5);
        newPower.gridCords = { x: data.gridX, y: data.gridY };
        store.dispatch(addPowerUp(data.gridX, data.gridY, newPower));
        this.world.bringToTop(powerGroup);
      }
    });

    socket.emit("game_started", { lobby: myId });
    this.world.setBounds(0, 0, 720, 720);
    this.map = this.add.tilemap("finalMap");
    this.map.addTilesetImage("tileset-biome", "gameTiles");

    blockedLayer = this.map.createLayer("10 obstacles");
    this.backgroundLayer = this.map.createLayer("0 floor");
    this.backgroundLayer1 = this.map.createLayer("1 trees");
    this.backgroundLayer2 = this.map.createLayer("2 trees");
    this.backgroundLayer3 = this.map.createLayer("3 cactus");
    this.backgroundLayer4 = this.map.createLayer("4 stumps");
    this.backgroundLayer5 = this.map.createLayer("5 shrubs");
    this.backgroundLayer6 = this.map.createLayer("6 rocks");
    this.backgroundLayer7 = this.map.createLayer("7 logs");
    this.backgroundLayer8 = this.map.createLayer("8 mushrooms");
    this.backgroundLayer9 = this.map.createLayer("9 pillars");
    this.map.setCollisionBetween(1, 100000, true, "10 obstacles");

    this.physics.enable(blockedLayer, Phaser.Physics.ARCADE);
    this.backgroundLayer.resizeWorld();

    powerGroup = this.add.group();
    powerGroup.enableBody = true;
    powerGroup.physicsBodyType = Phaser.Physics.ARCADE;

    crate = this.add.group();
    crate.enableBody = true;
    crate.physicsBodyType = Phaser.Physics.ARCADE;

    fire = this.add.group();
    fire.enableBody = true;
    fire.physicsBodyType = Phaser.Physics.ARCADE;

    paint = this.add.group();
    paint.enableBody = true;
    paint.physicsBodyType = Phaser.Physics.ARCADE;

    let crateTable = [];
    let width = 15;
    let height = 15;
    socket.on("load_crates", data => {
      if (!store.getState().Tiles.crates.length) {
        for (let h = 0; h < height; h++) {
          let crateRow = [];
          for (let w = 0; w < width; w++) {
            let tile = {
              obstacle: true,
              crate: false,
              paint: false,
              powerUp: false
            };
            if (
              h !== 0 &&
              w !== 0 &&
              h !== height - 1 &&
              w !== width - 1 &&
              (h % 2 == 1 || w % 2 == 1)
            ) {
              tile = {
                crate: false,
                paint: false,
                obstacle: false,
                powerUp: false
              };
              if (data.table[h][w]) {
                tile = {
                  crate: crate.create(h * 48, w * 48, "crate"),
                  paint: false,
                  obstacle: false,
                  powerUp: false
                };

                tile.crate.scale.setTo(0.095, 0.095);
                tile.crate.body.immovable = true;
              }
            }
            crateRow.push(tile);
          }

          crateTable.push(crateRow);
        }
      }
    });

    store.dispatch(loadCrates(crateTable));

    this.physics.startSystem(Phaser.Physics.ARCADE);
  }
  update() {
    let recievedEnemies = store.getState().Players.players;
    let currentClients = store.getState().Players.sockets;
    let actualEnemies = {};
    if (recievedEnemies) {
      this.game.lobby.players.forEach(key => {
        actualEnemies[key] = recievedEnemies[key];
      });
    }
    Object.keys(enemies).forEach(key => {
      if (!actualEnemies[key]) {
        enemies[key].sprite.kill();
        delete enemies[key];
      }
    });

    Object.keys(actualEnemies).forEach(key => {
      if (
        key !== name && actualEnemies[key] && actualEnemies[key].id === myId
      ) {
        let enemyExistBool = enemies[key] ? true : false;
        if (
          enemyExistBool && amountMade === this.game.lobby.players.length - 1
        ) {
          enemies[key].sprite.x = actualEnemies[key].position.x;
          enemies[key].sprite.y = actualEnemies[key].position.y;
          enemies[key].sprite.animations.play(actualEnemies[key].animation);
          store.dispatch(
            setMultiplayerScore(
              actualEnemies[key].color,
              actualEnemies[key].score
            )
          );
        }

        if (!enemyExistBool) {
          amountMade++;
          enemies[key] = new Hero(this, key, actualEnemies[key].color);
        }
      }
    });

    this.game.lobby.players.forEach(key => {
      if (key === name) {
        if (me[key] && amountMade >= this.game.lobby.players.length - 1) {
          me[key].update(this);
          this.physics.arcade.collide(me[key].sprite, blockedLayer);
          this.physics.arcade.collide(me[key].sprite, crate);
        }
        if (!me[key]) {
          let clientIndex = this.game.lobby.players.indexOf(key);

          switch (clientIndex) {
            case 0:
              me[key] = new Hero(this, key, "blue");
              break;
            case 1:
              me[key] = new Hero(this, key, "purple");
              break;
            case 2:
              me[key] = new Hero(this, key, "green");
              break;
            case 3:
              me[key] = new Hero(this, key, "red");

              break;
            default:
              break;
          }
        }
      }
    });
  }

  render() {
    if (!bool & (amountMade >= this.game.lobby.players.length - 1)) {
      timer = this.time.create();
      bool = true;
      timerEvent = timer.add(Phaser.Timer.SECOND * 120, this.endTimer, this);
      timer.start();
    }
    if (timer && timer.running) {
      store.dispatch(
        loadTimer(Math.round((timerEvent.delay - timer.ms) / 1000))
      );
    } else {
      if (amountMade >= this.game.lobby.players.length - 1) {
        store.dispatch(loadTimer("Done!"));
      }
    }
  }
  endTimer() {
    timer.stop();
  }
  formatTime(s) {
    var minutes = "0" + Math.floor(s / 60);
    var seconds = "0" + (s - minutes * 60);
    return minutes.substr(-2) + ":" + seconds.substr(-2);
  }
}

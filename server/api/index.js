"use strict";
const express = require("express");
const router = express.Router();
const { setLobby } = require("../reducers/Lobby");
const store = require("../store");

let Lobby = [];
let roomId = 1;

module.exports = io => {
  router.post("/name", (req, res, next) => {
    req.session = req.body;
    res.json(req.session);
  });
  router.get("/name", (req, res, next) => {
    res.json(req.session);
  });

  router.use("/lobby", (req, res, next) => {
    store.dispatch(setLobby(Lobby));
    io.emit("lobbyState", store.getState());

    next();
  });

  router.get("/lobby", (req, res, next) => {
    io.emit("lobbyState", store.getState());

    res.json(Lobby);
  });
  router.post("/lobby", (req, res, next) => {
    let multiple = false;
    Lobby.forEach(room => {
      if (room.players.includes(req.body.name)) multiple = true;
    });
    if (!multiple) {
      Lobby.push({ id: roomId, players: [req.body.name], start: false });
      roomId++;
    }
    res.json(Lobby);
    io.emit("lobbyState", store.getState());
  });
  router.post("/lobby/:roomId", (req, res, next) => {
    let currentRoom = Lobby.filter(room => room.id === +req.params.roomId);
    if (req.body.start) {
      currentRoom[0].start = true;
    } else {
      currentRoom[0].players.push(req.body.name);
    }
    io.emit("lobbyState", store.getState());
    res.json(Lobby);
  });
  router.get("/lobby/:roomId", (req, res, next) => {
    let currentRoom = Lobby.filter(room => room.id === req.params.roomId);
    io.emit("lobbyState", store.getState());

    res.json(currentRoom[0]);
  });
  router.delete("/lobby/:roomId/:playerName", (req, res, next) => {
    let currentRoom;
    Lobby.forEach((val, index) => {
      if (val.id === +req.params.roomId) currentRoom = index;
    });

    let currentPlayer = Lobby[currentRoom].players.indexOf(
      req.params.playerName
    );

    Lobby[currentRoom].players.splice(currentPlayer, 1);

    if (Lobby[currentRoom].players.length === 0) {
      Lobby.splice(currentRoom, 1);
    }
    io.emit("lobbyState", store.getState());
  });

  router.use((req, res, next) => {
    store.dispatch(setLobby(Lobby));
  });
  return router;
};

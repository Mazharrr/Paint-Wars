const store = require("../store");

const sendGameState = io => {
  setInterval(() => {
    io.emit("gameState", store.getState());
  }, 1000 / 30);
};

module.exports = { sendGameState };

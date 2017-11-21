"use strict";
import Phaser from "phaser";

export default class extends Phaser.State {
  create() {
    var style = {
      font: "bold 32px Arial",
      fill: "#fff",
      boundsAlignH: "center",
      boundsAlignV: "middle"
    };

    this.entryMessage = this.add.text(
      720 / 2 - 720,
      480 / 2,
      "Game Loading . . .",
      style
    );

    this.state.start("game");
  }

  startGame() {
    this.state.start("game");
  }
}

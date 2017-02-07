'use strict';
// import game from './stateManager'
import Phaser from 'phaser'

export default class extends Phaser.State {
    create() {
      var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

      this.entryMessage = this.add.text(480/2-100,480/2,"Click to continue", style)
        this.input.onDown.add(this.startGame, this);
        // this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.state.start('game');
    }
}

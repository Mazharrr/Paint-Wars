'use strict';
// import game from './stateManager'
import Phaser from 'phaser'

export default class extends Phaser.State {
    create() {
      var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

      this.entryMessage = this.add.text(720/2-720,480/2,"Game Loading . . .", style)

        this.state.start('game');
        // this.input.onDown.add(this.startGame, this);
        // this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.state.start('game');
    }
}

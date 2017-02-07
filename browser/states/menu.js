'use strict';
import game from './stateManager'

export default class Menu {
    create() {
      var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

      this.entryMessage = game.add.text(480/2-100,480/2,"Click to continue", style)
        this.game.input.onDown.add(this.startGame, this);
        // this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('game');
    }
}

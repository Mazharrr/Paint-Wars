'use strict';

class Menu {
    create() {
      var style = { font: "bold 32px Arial", fill: "#fff", boundsAlignH: "center", boundsAlignV: "middle" };

      this.entryMessage = game.add.text(w/2-100,h/2,"Click to continue", style)
        this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('game');
    }
}

'use strict';

class Menu {
    create() {
      console.log('click to continue')
        this.game.input.onDown.add(this.startGame, this);
    }

    startGame() {
        this.game.state.start('game');
    }
}

export default Menu;

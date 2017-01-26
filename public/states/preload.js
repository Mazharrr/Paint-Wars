'use strict';

class Preload {
    preload(game) {

        game.time.advancedTiming = true;
    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

export default Preload;

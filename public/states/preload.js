'use strict';

class Preload {
    preload(game) {
        game.time.advancedTiming = true;
        this.onLoadComplete()
        game.load.image('grass', '../assets/grass.jpg')
        game.load.atlas('hero1', '../assets/heroIDLE.png', '../assets/heroIDLE.json')
    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

'use strict';

class Preload {
    preload(game) {
        game.time.advancedTiming = true;
        this.onLoadComplete()
        game.load.image('grass', '../assets/grass.jpg')
        game.load.atlas('hero1', '../assets/heroIDLE.png', '../assets/heroIDLE.json')

        game.load.atlas('mechaKoopa', '../assets/mechaKoopa/mechaKoopaIdle.png', '../assets/mechaKoopa/mechaKoopaIdle.json')

        game.load.spritesheet('koopa', '../assets/evenKooper.png', 30, 40);


    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

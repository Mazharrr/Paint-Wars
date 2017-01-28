'use strict';

class Preload {
    preload(game) {
        game.time.advancedTiming = true;
        this.onLoadComplete()
        game.load.image('grass', '../assets/grass.jpg')
        game.load.tilemap('jamesMap', '../assets/tutorialTilemap.json', null, Phaser.Tilemap.TILED_JSON)
        game.load.image('gameTiles', '../assets/tiles.png')

        game.load.atlas('mechaKoopa', '../assets/mechaKoopa/mechaKoopaTP.png', '../assets/mechaKoopa/mechaKoopaTP.json')

        game.load.atlas('hero1', '../assets/spinHero1.png', '../assets/spinHero1.json')

        game.load.atlas('koopa', '../assets/koopaRoll.png', '../assets/koopaRoll.json');
        game.load.atlas('spinHero', '../assets/spinHero1.png', '../assets/spinHero1.json');


    }

    onLoadComplete() {
        this.game.state.start('menu', true, false);
    }
}

'use strict';

export default class extends Phaser.State {
    preload() {
      this.load.image('logo', '../assets/paintWarsLogo.png')

      this.time.advancedTiming = true;
      this.load.image('grass', '../assets/grass.jpg')
      this.load.tilemap('finalMap', '../assets/finalMap.json', null, Phaser.Tilemap.TILED_JSON)
      this.load.image('gameTiles', '../assets/tileset-biome.png')
      this.load.image('crate', '../assets/RTS_Crate.png');



      this.load.image('fire', '../assets/fire.png')
      this.load.image('blue', '../assets/bluePaint.png');
      this.load.image('purple', '../assets/purplePaint.png');
      this.load.image('green', '../assets/greenPaint.png');
      this.load.image('red', '../assets/redPaint.png');


      this.load.image('bombPowerUp', '../assets/quantityPowerUp.png')
      this.load.image('rangePowerUp', '../assets/rangePowerUp.png')
      this.load.image('speedPowerUp', '../assets/speedPowerUp.png')
      this.load.atlas('mechaKoopa', '../assets/mechaKoopa/mechaKoopaTP.png', '../assets/mechaKoopa/mechaKoopaTP.json')


      this.load.atlas('hero1', '../assets/spinHero1.png', '../assets/spinHero1.json')

      this.load.atlas('koopa', '../assets/koopaRoll.png', '../assets/koopaRoll.json');
      this.load.atlas('spinHero', '../assets/spinHero1.png', '../assets/spinHero1.json');

      this.load.atlas('bowserJunior', '../assets/bowserJunior.png', '../assets/bowserJunior.json');
     this.load.atlas('larryKoopa', '../assets/larryKoopa.png', '../assets/larryKoopa.json');
     this.load.atlas('lemmyKoopa', '../assets/lemmy.png', '../assets/lemmy.json');
     this.load.atlas('yoshi', '../assets/yoshi.png', '../assets/yoshi.json');

    }

    create() {
        this.state.start('preload');
    }
}

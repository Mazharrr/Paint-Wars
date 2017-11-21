'use strict';
import game from './stateManager'
import Phaser from 'phaser';

export default class extends Phaser.State {

    preload() {
      this.onLoadComplete()
    }

    onLoadComplete() {
        this.state.start('menu', true, false);
    }
}

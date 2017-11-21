import Boot from './boot';
import Preload from './preload';
import Menu from './menu';
import Game from './game';
import Phaser from 'phaser';

var w = 720, h = 720;

class game extends Phaser.Game{
  constructor(lobby){
    super(w,h,Phaser.CANVAS,'gameContainer', null)
    this.lobby= lobby
    this.config.disableVisibilityChange = true;
    this.state.add('boot', Boot);
    this.state.add('preload', Preload, false);
    this.state.add('menu', Menu, false);
    this.state.add('game', Game, false)
    this.state.start('boot');
  }
}

export default game;
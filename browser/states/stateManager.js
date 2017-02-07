import Boot from './boot';
import Preload from './preload';
import Menu from './menu';
import Game from './game';
import Phaser from 'phaser';

var w = 720, h = 720;

class game extends Phaser.Game{
  constructor(){
    super(w,h,Phaser.CANVAS,'gameContainer', null)
    this.config.disableVisibilityChange = true;
    this.state.add('boot', Boot);
    this.state.add('preload', Preload, false);
    this.state.add('menu', Menu, false);
    this.state.add('game', Game, false)
    this.state.start('boot');
  }
}

// var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameContainer');

// game.state.start('boot');

export default game;



// import Boot from './boot';
// import Preload from './preload';
// import Menu from './menu';
// import Game from './game';
// import Phaser from 'phaser';
//
// var w = 720, h = 720;
//
//
//
// var game = new Phaser.Game(w, h, Phaser.CANVAS, 'gameContainer');
// game.config.disableVisibilityChange = true;
// game.state.add('boot', Boot);
// game.state.add('preload', Preload);
// game.state.add('menu', Menu);
// game.state.add('game', Game)
// // game.state.start('boot');
//
// export default game;

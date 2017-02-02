import Boot from './boot';
import Preload from './preload';
import Menu from './menu';
import Game from './game';
import Phaser from 'phaser';

var w = 720, h = 720;

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('menu', Menu);
game.state.add('game', Game)
game.state.start('boot');

export default game;

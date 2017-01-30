// var w = window.innerWidth * window.devicePixelRatio,
//   h = window.innerHeight * window.devicePixelRatio;

var w = 480, h = 480;

var game = new Phaser.Game(w, h, Phaser.AUTO, 'gameContainer');

game.state.add('boot', Boot);
game.state.add('preload', Preload);
game.state.add('menu', Menu);
game.state.add('game', Game)
game.state.start('boot');

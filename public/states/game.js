
var player;
var koopasArr= [];


class Game{
  create(game){
    game.world.setBounds(0,0,480 ,480)
    let map = this.game.add.tilemap('jamesMap');
    map.addTilesetImage('hjk', 'gameTiles');
    let backgroundLayer = map.createLayer('Tile Layer 1')
    let objectsLayer = map.createLayer('Tile Layer 2')
    backgroundLayer.resizeWorld();


    game.physics.startSystem(Phaser.Physics.ARCADE);
    this.mechaKoopa = new MechaKoopa(game);
    this.hero = new Hero(game);
    player = this.hero;


  	let koopasTotal = 1;
  	let koopasAlive = 1;

    for (var i = 0; i < koopasTotal; i++)
    {
        koopasArr.push(new Koopa(game));
    }


  }
  update(){
    if(this.hero)this.hero.update(game)
    	 koopasArr[0].update(game);
    	//  koopasArr[1].update(game);
    	 if(this.mechaKoopa) this.mechaKoopa.update(game)


  }

}

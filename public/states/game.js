
var player;
var koopasArr= [];


class Game{
  create(game){
    game.world.setBounds(0,0,480 ,480)
    this.map = this.game.add.tilemap('jamesMap');
    this.map.addTilesetImage('hjk', 'gameTiles');
    this.backgroundLayer = this.map.createLayer('Tile Layer 1')
    this.blockedLayer = this.map.createLayer('Tile Layer 2')
    this.map.setCollisionBetween(1, 100000, true, 'Tile Layer 2');
    game.physics.enable(this.blockedLayer, Phaser.Physics.ARCADE);
    this.backgroundLayer.resizeWorld();

    this.crate = game.add.group();
    this.crate.enableBody = true;
    this.crate.physicsBodyType = Phaser.Physics.ARCADE;



    let crate;
    let width = 15;
    let height = 15;

    for(let h = 0; h< height; h++){
    	for (let w = 0; w < width; w++){
    		//console.log(h,w)

    		if(h!==0 && w!==0 && h!==height-1 && w!==width-1 && (h%2==1 || w%2==1) && !(h===1 && w===1) && !(h===height-2 && w===width-2 ) && !(h===1 && w== width-2)&& !(h===height-2 && w===1) && !(h===2 && w===1) && !(h===1 && w===2) && !(h==height-2 && w=== width-3) && !(h===height-3 && w=== width-2) && !(h===height-2 &&w===2) && !(h===height-3 && w==1) && ! (w===width-3 && h===1) && !(w===width-2 && h===2)){
    		    		crate = this.crate.create(h*32, w*32, 'crate');
                // e.frame = 'crate'
                crate.scale.setTo(0.062,0.062)
    		   			crate.body.immovable= true};

    	}

    }

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.mechaKoopa = new MechaKoopa(game);
    this.hero = new Hero(game);
    player = this.hero;
    // player.sprite.anchor.set(0.5, 1);


  	// let koopasTotal = 1;
  	// let koopasAlive = 1;
    //
    // for (var i = 0; i < koopasTotal; i++)
    // {
    //     koopasArr.push(new Koopa(game));
    // }
    //

  }
  update(){

  	game.physics.arcade.collide(this.hero.sprite, this.blockedLayer);
    game.physics.arcade.collide(this.hero.sprite, this.crate)
    if(this.hero)this.hero.update(game)
    	//  koopasArr[0].update(game);
    	//  koopasArr[1].update(game);
    	 if(this.mechaKoopa) this.mechaKoopa.update(game)


  }

}

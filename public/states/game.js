
var player;
var koopasArr= [];
var playerCollisionGroup
var koopaCollisionGroup


class Game{
  create(game){
    game.world.setBounds(0,0,1000 ,600)
    let background = game.add.tileSprite(0,0,1000,600, 'grass')
    game.physics.startSystem(Phaser.Physics.P2JS);
    game.physics.p2.setImpactEvents(true);
    game.physics.p2.restitution = 0.8;
    this.mechaKoopa = new MechaKoopa(game);

     playerCollisionGroup = game.physics.p2.createCollisionGroup();
     koopaCollisionGroup = game.physics.p2.createCollisionGroup();


    game.physics.p2.updateBoundsCollisionGroup();


    this.hero = new Hero(game);
    player = this.hero;
    let koopas = game.add.group()
    koopas.enableBody = true;
    koopas.physicsBodyType = Phaser.Physics.P2JS
  	let koopasTotal = 2;
  	let koopasAlive = 2;
  
    for (var i = 0; i < koopasTotal; i++)
    {
        koopasArr.push(new Koopa(game));
    }


  }
  update(){
    if(this.hero)this.hero.update(game)
    	 koopasArr[0].update(game);
    	 koopasArr[1].update(game);
    	 if(this.mechaKoopa) this.mechaKoopa.update(game)


  }

}

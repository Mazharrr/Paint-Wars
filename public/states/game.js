
var player;
var koopas;


class Game{
  create(game){
    game.world.setBounds(0,0,1000 ,600)
    let background = game.add.tileSprite(0,0,1000,600, 'grass')
    game.physics.startSystem(Phaser.Physics.P2JS);

    this.mechaKoopa = new MechaKoopa(game)


    this.hero = new Hero(game);
    player = this.hero;
    koopas = [];
  	let koopasTotal = 2;
  	let koopasAlive = 2;
  
    for (var i = 0; i < koopasTotal; i++)
    {
        koopas.push(new Koopa(game));
    }


  }
  update(){
    if(this.hero)this.hero.update(game)
    	 koopas[0].update(game);
    	 koopas[1].update(game);
    	 if(this.mechaKoopa) this.mechaKoopa.update(game)


  }

}

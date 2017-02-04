import game from './stateManager';
import Hero from '../class/hero1';
import store from '../store';
import {loadCrates, addPlayer} from '../reducers/Classes';

var player;
var koopasArr= [];
var crateTable;



export default class Game{
  create(game){
    game.stage.disableVisibilityChange = true;
    game.world.setBounds(0,0,720 ,720)
    this.map = this.game.add.tilemap('finalMap');
    this.map.addTilesetImage('tileset-biome', 'gameTiles');

    this.blockedLayer = this.map.createLayer('10 obstacles')
    this.backgroundLayer = this.map.createLayer('0 floor')
    this.backgroundLayer1 = this.map.createLayer('1 trees')
    this.backgroundLayer2 = this.map.createLayer('2 trees')
    this.backgroundLayer3 = this.map.createLayer('3 cactus')
    this.backgroundLayer4 = this.map.createLayer('4 stumps')
    this.backgroundLayer5 = this.map.createLayer('5 shrubs')
    this.backgroundLayer6 = this.map.createLayer('6 rocks')
    this.backgroundLayer7 = this.map.createLayer('7 logs')
    this.backgroundLayer8 = this.map.createLayer('8 mushrooms')
    this.backgroundLayer9 = this.map.createLayer('9 pillars')
    this.map.setCollisionBetween(1, 100000, true, '10 obstacles');

    game.physics.enable(this.blockedLayer, Phaser.Physics.ARCADE);
    this.backgroundLayer.resizeWorld();

    this.powerGroup = game.add.group();
    this.powerGroup.enableBody = true;
    this.powerGroup.physicsBodyType = Phaser.Physics.ARCADE;

    this.crate = game.add.group();
    this.crate.enableBody = true;
    this.crate.physicsBodyType = Phaser.Physics.ARCADE;


    this.fire = game.add.group();
    this.fire.enableBody = true;
    this.fire.physicsBodyType = Phaser.Physics.ARCADE;

    this.paint = game.add.group()
    this.paint.enableBody = true;
    this.paint.physicsBodyType = Phaser.Physics.ARCADE;




    let crateTable = []
    let crate;
    let width = 15;
    let height = 15;

    for(let h = 0; h< height; h++){
      let crateRow = []
    	for (let w = 0; w < width; w++){
    		//console.log(h,w)
        let tile = {obstacle: true, crate: false, paint: false, powerUp: false}
    		if(h!==0 && w!==0 && h!==height-1 && w!==width-1 && (h%2==1 || w%2==1) ){
          tile = {crate: false, paint: false, obstacle: false, powerUp: false}
          if(!(h===1 && w===1) && !(h===height-2 && w===width-2 ) && !(h===1 && w== width-2)
          && !(h===height-2 && w===1) && !(h===2 && w===1) && !(h===1 && w===2) && !(h==height-2
            && w=== width-3) && !(h===height-3 && w=== width-2) && !(h===height-2 &&w===2) && !(h===height-3 && w==1)
            && ! (w===width-3 && h===1) && !(w===width-2 && h===2)){


                tile = {crate: this.crate.create(h*48, w*48, 'crate'), paint: false, obstacle: false, powerUp: false};

                // e.frame = 'crate'
                tile.crate.scale.setTo(0.095,0.095)
    		   			tile.crate.body.immovable= true
              }
        };
          crateRow.push(tile)

    	}

      crateTable.push(crateRow)

    }
    store.dispatch(loadCrates(crateTable));
    console.log('store', store.getState());

    game.physics.startSystem(Phaser.Physics.ARCADE);
    // this.mechaKoopa = new MechaKoopa(game);
    this.hero = new Hero(game, this.fire, this.paint, this.powerGroup);
    player = this.hero;
    store.dispatch(addPlayer())



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
    game.physics.arcade.collide(this.hero.sprite, this.crate);
    //game.physics.arcade.collide(this.hero.sprite, this.bombGroup);
    //game.physics.arcade.collide(this.hero.sprite, yellowPadlocks);

    // game.physics.arcade.overlap(this.fire, this.blockedLayer, () =>{console.log('overlap')})

    if(this.hero)this.hero.update(game)
    	//  koopasArr[0].update(game);
    	//  koopasArr[1].update(game);
    	 if(this.mechaKoopa) this.mechaKoopa.update(game)


  }

}

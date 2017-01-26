class Game{
  create(game){
    game.world.setBounds(0,0,1000 ,600)
    let background = game.add.tileSprite(0,0,1000,600, 'grass')
    game.physics.startSystem(Phaser.Physics.P2JS);
    this.hero = new Hero(game)
  }
  update(){
    if(this.hero)this.hero.update(game)
  }

}

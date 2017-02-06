export default class Enemy {
  constructor(game, x, y, id){
    this.game =game
    this.x = x
    this.y = y
    this.addSprite()
    this.id = id
  }
  addSprite(){
    this.sprite = this.game.add.sprite(this.x, this.y, 'hero1');
    this.sprite.scale.setTo(0.7,0.7)
    this.sprite.animations.add('walk',[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,84,85,85,86,87], 15)
    this.sprite.animations.play('walk')
    this.game.physics.arcade.enable(this.sprite)
    this.sprite.body.immovable = true;
  }
  isDead(){
    this.sprite.kill()
  }

}

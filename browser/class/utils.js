export const Utils = {


    mapCoordsToBlock: function(x, y)
    {

        console.log('X',x,'Y',y);
        var blockCoords = {};
        blockCoords.x =
        (Math.floor(x/32))*32+16;

        blockCoords.y =
        (Math.floor(y/32))*32+16;
        console.log(blockCoords);
        return blockCoords;
    },

    explode: function(x,y,range, group){
      console.log('test')
      let mapSize = 32
      let flame= group.create(x,y, 'fire')
      flame.scale.setTo(0.5,0.5)
      flame.anchor.setTo(0.5,0.5)
      flame= group.create(x+mapSize,y, 'fire')
      flame.scale.setTo(0.5,0.5)
      flame.anchor.setTo(0.5,0.5)
      flame= group.create(x,y+mapSize, 'fire')
      flame.scale.setTo(0.5,0.5)
      flame.anchor.setTo(0.5,0.5)
      flame= group.create(x-mapSize,y, 'fire')
      flame.scale.setTo(0.5,0.5)
      flame.anchor.setTo(0.5,0.5)
      flame= group.create(x,y-mapSize, 'fire')
      flame.scale.setTo(0.5,0.5)
      flame.anchor.setTo(0.5,0.5)

    }

}


// let flame = this.fire.create(blockCoords.x, blockCoords.y, 'fire')
// flame.scale.setTo(0.5,0.5)
// flame.anchor.setTo(0.5,0.5)
//  flame = this.fire.create(blockCoords.x-32, blockCoords.y, 'fire')
// flame.scale.setTo(0.5,0.5)
// flame.anchor.setTo(0.5,0.5)
//  flame = this.fire.create(blockCoords.x, blockCoords.y-32, 'fire')
// flame.scale.setTo(0.5,0.5)
// flame.anchor.setTo(0.5,0.5)
//  flame = this.fire.create(blockCoords.x+32, blockCoords.y, 'fire')
// flame.scale.setTo(0.5,0.5)
// flame.anchor.setTo(0.5,0.5)
//  flame = this.fire.create(blockCoords.x, blockCoords.y+32, 'fire')
// flame.scale.setTo(0.5,0.5)
// flame.anchor.setTo(0.5,0.5)

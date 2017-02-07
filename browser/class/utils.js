export const Utils = {


    mapCoordsToBlock: function(x, y) {

      var blockCoords = {};
      blockCoords.x =
      (Math.floor(x/48))*48+24;

      blockCoords.y =
      (Math.floor(y/48))*48+24;

      return blockCoords;

    },
    indexToXY: function(x, y) {

      var blockCoords = {};
      blockCoords.x =
      Math.floor(x)*48+24;

      blockCoords.y =
      Math.floor(y)*48+24;

      return blockCoords;

    },
    mapCoordsToGrid: function(x,y) {

      var blockCoords = {};
      blockCoords.x =
      (Math.floor(x/48));

      blockCoords.y =
      (Math.floor(y/48));
      return blockCoords;

    },

    // EI: take this out --
    // explode: function(x,y,range, group, game){
    //   console.log('test')
    //   let mapSize = 32
    //   let flameArr =[]
    //   let flame = group.create(x,y, 'fire')
    //   flame.scale.setTo(0.5,0.5)
    //   flame.anchor.setTo(0.5,0.5)
    //   flameArr.push(flame)
    //   flame= group.create(x+mapSize,y, 'fire')
    //   flame.scale.setTo(0.5,0.5)
    //   flame.anchor.setTo(0.5,0.5)
    //   flameArr.push(flame)
    //   flame= group.create(x,y+mapSize, 'fire')
    //   flame.scale.setTo(0.5,0.5)
    //   flame.anchor.setTo(0.5,0.5)
    //   flameArr.push(flame)
    //   flame= group.create(x-mapSize,y, 'fire')
    //   flame.scale.setTo(0.5,0.5)
    //   flame.anchor.setTo(0.5,0.5)
    //   flameArr.push(flame)
    //   flame= group.create(x,y-mapSize, 'fire')
    //   flame.scale.setTo(0.5,0.5)
    //   flame.anchor.setTo(0.5,0.5)
    //   flameArr.push(flame)
    //   flameArr.forEach(flame => {
    //     var timer = game.time.events.add(Phaser.Timer.SECOND * .1, () => {
    //       flame.kill()
    //
    //     });
    //   })
    // }

    adjacentCrates: function(x, y, range, allCrates) {
      let bombSquare = this.mapCoordsToGrid(x, y)
      // EI: take this out
      // bombSquare = {x : x , y : y}
      // [coordinates that are adjacent to bombsquare]
      let adjacentCrates = [bombSquare];

      // EI dry up the following several for loops? additional helper function?
      for (let i = 1; i <= range; i++) {

        if(allCrates[bombSquare.x-i] && allCrates[bombSquare.x-i][bombSquare.y]&& allCrates[bombSquare.x-i][bombSquare.y].obstacle) break;
        adjacentCrates.push({x: bombSquare.x-i, y: bombSquare.y})
        if(allCrates[bombSquare.x-i] && allCrates[bombSquare.x-i][bombSquare.y]  && allCrates[bombSquare.x-i][bombSquare.y].crate ) break;


      }
      for (let i = 1; i <= range; i++) {
      if(allCrates[bombSquare.x] && allCrates[bombSquare.x][bombSquare.y+i]&& allCrates[bombSquare.x][bombSquare.y+i].obstacle) break;
       adjacentCrates.push({x: bombSquare.x, y: bombSquare.y+i})
       if(allCrates[bombSquare.x] && allCrates[bombSquare.x][bombSquare.y+i] && allCrates[bombSquare.x][bombSquare.y+i].crate ) break;

      }
      for (let i = 1; i <= range; i++) {
        if(allCrates[bombSquare.x+i] && allCrates[bombSquare.x+i][bombSquare.y]&& allCrates[bombSquare.x+i][bombSquare.y].obstacle) break;
         adjacentCrates.push({x: bombSquare.x+i, y: bombSquare.y})
         if(allCrates[bombSquare.x+i] && allCrates[bombSquare.x+i][bombSquare.y] && allCrates[bombSquare.x+i][bombSquare.y].crate ) break;


      }
      for (let i = 1; i <= range; i++) {
        if(allCrates[bombSquare.x] && allCrates[bombSquare.x][bombSquare.y-i]&& allCrates[bombSquare.x][bombSquare.y-i].obstacle) break;
       adjacentCrates.push({x: bombSquare.x, y: bombSquare.y-i})
       if(allCrates[bombSquare.x] && allCrates[bombSquare.x][bombSquare.y-i] && allCrates[bombSquare.x][bombSquare.y-i].crate ) break;

      }
      return adjacentCrates;
    }

}

// EI: take this out
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

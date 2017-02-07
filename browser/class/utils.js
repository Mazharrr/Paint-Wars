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
    adjacentCrates: function(x, y, range, allCrates) {
      let bombSquare = this.mapCoordsToGrid(x, y)
      // bombSquare = {x : x , y : y}
      // [coordinates that are adjacent to bombsquare]
      let adjacentCrates = [bombSquare];
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

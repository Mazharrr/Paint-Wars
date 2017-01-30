let Utils = {


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
	}

}
var Level = function( length, minSpace, maxSpace, maxHeight)
{
	// The length of the level, in pixels?
	this.levelLength = length;
	
	// The entities of the level
	this.levelEntities = [];
	var lastSpawn = 250;
	console.log(minSpace, maxSpace, maxHeight);
	while( lastSpawn < length )
	{
		lastSpawn += Math.max(Math.round(( Math.random() * ( maxSpace - minSpace) ) + minSpace ) - 35, 35);
		if( lastSpawn < length )
		{
			this.levelEntities[lastSpawn] = new Obstacle(
					lastSpawn,
					Math.max(Utilities.random(-20, maxHeight), 0),
					32,
					32,
					'assets/BlockGreen.png',
					false
					);
		}
		if(maxSpace > 64) maxSpace -= 3;
		if(maxHeight < 250) maxHeight += 3;
	}
	
	this.levelEntities[lastSpawn] = new Obstacle(
					lastSpawn,
					0,
					100,
					32,
					'assets/finish.jpg',
					false
					);
	console.log(minSpace, maxSpace, maxHeight);

};
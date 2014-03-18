var Level = function( length, minSpace, maxSpace, maxHeight )
{
	// The length of the level, in pixels?
	this.levelLength = length;
	
	// The entities of the level
	this.levelEntities = [];

	var lastSpawn = 250;
	while( lastSpawn < length )
	{
		lastSpawn += Math.round(( Math.random() * ( maxSpace - minSpace) ) + minSpace );
		console.log( lastSpawn );
		if( lastSpawn < length )
		{
			this.levelEntities[lastSpawn] = new Obstacle(
					lastSpawn,
					Utilities.random(0, maxHeight),
					32,
					32,
					'assets/BlockGreen.png',
					false
					);
		}
	}
};
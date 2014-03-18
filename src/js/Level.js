var Level = function( length, minSpace, maxSpace, maxHeight )
{
	// The length of the level, in pixels?
	this.levelLength = length;
	
	// The entities of the level
	this.levelEntities = [];

	var lastSpawn = 0;
	while( lastSpawn < length )
	{
		lastSpawn += ( Math.random() * ( maxSpace - minSpace) ) + minSpace;

		this.levelEntities[lastSpawn] = new Obstacle(
				lastSpawn,
				0,
				32,
				32,
				'assets/BlockGreen.png',
				false
				);
	}

	for( i = 0; i < length;  )
	{
		if( Math.random() <
			( Math.max( 0, i - lastSpawn - minSpace ) ) /
			( maxSpace - minSpace ) )
		{
			this.levelEntities[i] = new Obstacle(
				i,
				0,
				32,
				32,
				'assets/BlockGreen.png',
				false
				);

			lastSpawn = i;
		}
	}
}
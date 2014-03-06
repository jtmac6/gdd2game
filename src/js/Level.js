var Level = function( length, minSpace, maxSpace, maxHeight )
{
	this.levelEntities = [];

	var lastSpawn = 0;
	for( i = 0; i < length; i++ )
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
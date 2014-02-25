var Scene = function(sceneNum){
	this.sceneNum = sceneNum;
	this.gameEntities = [];
	this.player = new Player(50,this.sceneNum == 1 ? 50 : window.innerHeight / 3 + 50, this.sceneNum == 1 ? 'assets/PlayerBlue.png' : 'assets/PlayerRed.png');
	this.speed = 100;
	this.timePassed = 0;
	this.objectGenerationTick = 0;
	
	//initializes the starting state of the game
	this.init = function(){

	}
	//calls the draw of each entity in the scene
	this.draw = function(ctx){
		//draw the screen itself
		ctx.strokeWidth = 5;
		ctx.fillStyle = "green";
		if(sceneNum == 1){
			ctx.strokeRect(10,10,window.innerWidth - 20, window.innerHeight / 3);
		}
		else{
			ctx.strokeRect(10,window.innerHeight / 3 + 20,window.innerWidth - 20, window.innerHeight / 3);
		}
		//draw entities
		this.player.draw(ctx);
		for (var i = this.gameEntities.length - 1; i >= 0; i--) {
			this.gameEntities[i].draw(ctx);
		};
	}
	//cleans up objects which are no longer needed
	this.clearArtifacts = function(){

	}
	//moves that static obstacles in the scene to the left
	this.moveObstacles = function(){
        for( var i = this.gameEntities.length - 1; i >= 0; i-- ) {
			this.gameEntities[i].x -= ( milis / 1000 ) * this.speed;
			if( this.gameEntities[i].x < 0 + this.gameEntities[i].width ) {
				this.gameEntities.splice( i, 1 );
			}
        }
	}
	//creates new objects in the scene
	this.generateNewObjects = function(){
		this.objectGenerationTick += milis;
		if( this.objectGenerationTick > 2000 ) {
			this.gameEntities.push( new Obstacle( 1000, 20 + ( 50 * this.sceneNum ), 20, 30, this.sceneNum == 1 ? 'assets/BlockBlue.png' : 'assets/BlockRed.png', false ) );
			this.objectGenerationTick = 0;
		}
	}
	//checks collisions, also resolves them
	this.checkCollisions = function(){
		for (var i = this.gameEntities.length - 1; i >= 0; i--) {
			var nextEntity = gameEntities[i];
			// Check if the entity intersects with the player
			if (intersectsPlayer(entity))
			{
				// Handle collision!
				
				// If the player is coming up from the bottom, 
				// Set a variable to ignore the collision until they are no 
				// longer colliding with the entity
				
			}
		};
	}
	
	// Check if an entity intersects the player.
	this.intersectsPlayer = function(entity) {
		var noOverlap = (
			entity.x > player.x+player.width ||
			player.x > entity.x+entity.width ||
			entity.y > player.y+player.height ||
			player.y > entity.y+entity.height
			);
		return !noOverlap;
	};
	
	//updates the game to the next state
	this.update = function(ctx){
		this.timePassed += milis;
		this.draw(ctx);
		this.moveObstacles();
		this.generateNewObjects();
	}
}
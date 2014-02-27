var Scene = function(sceneNum, scene_pos_x, scene_pos_y){
	this.sceneNum = sceneNum;
	this.gameEntities = [];
	this.player = new Player(50,this.sceneNum == 1 ? 50 : window.innerHeight / 3 + 50, this.sceneNum == 1 ? 'assets/PlayerBlue.png' : 'assets/PlayerRed.png');
	this.speed = 100;
	this.timePassed = 0;
	this.objectGenerationTick = 0;
	this.scene_y = scene_pos_y;
	this.scene_x = scene_pos_x;
	this.scene_height = 300;
	this.scene_width = window.innerWidth - 20;
	this.gravity = 5;
	
	//initializes the starting state of the game
	this.init = function(){

	}
	//calls the draw of each entity in the scene
	this.draw = function(ctx){
		//draw the screen itself
		ctx.strokeWidth = 5;
		ctx.fillStyle = "green";
		
		ctx.strokeRect(this.scene_x,this.scene_y, this.scene_width, this.scene_height);
		
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
		if(this.player.y != this.scene_y + this.scene_height - this.player.height){
			this.player.y += this.gravity;
		}
		this.draw(ctx);
		this.moveObstacles();
		this.generateNewObjects();
	}
}
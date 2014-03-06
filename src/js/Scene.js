var Scene = function(sceneNum, scenePosX, scenePosY, sceneWidth, sceneHeight, level){
	this.sceneNum = sceneNum;
	this.speed = 15;
	this.timePassed = 0;
	this.objectGenerationTick = 0;
	this.sceneDrawY = scenePosY;
	this.sceneDrawX = scenePosX;
	this.sceneX = 0;
	this.sceneWidth = sceneWidth;
	this.sceneHeight = sceneHeight;
	this.gravity = 3;
	this.initialPlayerX = 250;
	this.player = new Player(this.initialPlayerX,this.sceneDrawY + this.sceneHeight - 50, this.sceneNum == 1 ? 'assets/Player1.png' : 'assets/Player2.png');
	this.inputBuffer = {"jump": false, "item":false, "slide": false};
	this.level = level;
	/*
	Prototyping Code
	document.addEventListener('keydown', function(event){
	console.log(event.keyCode);
		if(event.keyCode == 87) scene1.player.jump();
		if(event.keyCode == 65) scene1.player.moveLeft();
		if(event.keyCode == 68) scene1.player.moveRight();
		if(event.keyCode == 39) scene2.player.moveRight();
		if(event.keyCode == 37) scene2.player.moveLeft();
		if(event.keyCode == 38) scene2.player.jump();
	});
	*/

	//initializes the starting state of the game
	this.init = function(){

	}
	//pushes a keyboard input to the scene's input buffer
	this.pushInput = function(input){
		if(input in this.inputBuffer)
			this.inputBuffer[input] = true;
	}
	this.popInput = function(input){
		if(input in this.inputBuffer)
			this.inputBuffer[input] = false;
	}
	//simply informs the player which actions it should be taking
	this.callPlayerActions = function(){
		if(this.inputBuffer["jump"]) this.player.jump();
		if(this.inputBuffer["slide"]) this.player.crouch();
		if(this.inputBuffer["item"]) this.player.useItem();
		if(this.inputBuffer["right"]) this.player.moveRight();
		if(this.inputBuffer["left"]) this.player.moveLeft();

	}
	//calls the draw of each entity in the scene
	this.draw = function(ctx){
		//draw the screen itself
		ctx.strokeWidth = 5;
		ctx.fillStyle = "green";
		
		ctx.strokeRect(this.sceneDrawX,this.sceneDrawY, this.sceneWidth, this.sceneHeight);
		
		//draw entities
		this.player.draw(ctx, this.sceneX);
		for (var i = this.sceneX; i < this.sceneX + this.sceneWidth; i++) {
			if(this.level.levelEntities[i] !== undefined)
				this.level.levelEntities[i].draw(ctx, this.sceneX);
		};
	}
	//cleans up objects which are no longer needed
	this.clearArtifacts = function(){

	}
	
	/**
	* Resolve a collision with an entity.
	* @param entity The entity that the player collided with.
	**/
	this.resolveCollision = function(entity) {
		var player = this.player;
		
		/* TODO:
		* If the player is coming up from the bottom, 
		* Set a variable to ignore the collision until they are no 
		* longer colliding with the entity
		*/
		//console.log("Collision!");
		
		if (true)
		{
			// Push the player for now
			player.x = entity.x-player.width;
			
			if (player.isDead())
			{
				this.respawn();
			}
		}
	}
	
	/**
	* Respawn the player.
	**/
	this.respawn = function() {
		this.player.x = this.initialPlayerX;
	}
	
	//checks collisions, also resolves them
	this.checkCollisions = function() {
		for (var i = this.sceneX; i < this.sceneX + this.sceneWidth; i++) {
			var nextEntity = this.level.levelEntities[i];
			// Check if the entity intersects with the player
			if (nextEntity !== undefined && this.intersectsPlayer(nextEntity))
			{
				// Handle collision!
				this.resolveCollision(nextEntity);
			}
		};
	}
	
	// Check if an entity intersects the player.
	this.intersectsPlayer = function(entity) {
		var noOverlap = (
			entity.x > this.player.x+this.player.width ||
			this.player.x > entity.x+entity.width ||
			entity.y > this.player.y+this.player.height ||
			this.player.y > entity.y+entity.height
			);
		return !noOverlap;
	}
	
	//updates the game to the next state
	this.update = function(ctx){
		this.sceneX += this.speed;
		this.player.x += this.speed;
		//tell the player what to do
		this.callPlayerActions();
		this.player.yvelocity -= this.gravity;
		this.player.y -= this.player.yvelocity;
		if( ( this.player.y + this.player.height ) > ( this.sceneDrawY + this.sceneHeight ) )
		{
			this.player.y = this.sceneDrawY + this.sceneHeight - this.player.height;
			this.player.yvelocity = 0;
			this.player.isJumping = false;
			this.player.isHighJumping = false;
		}
		this.checkCollisions();
		this.draw(ctx);
		//this.moveObstacles();
	}
}
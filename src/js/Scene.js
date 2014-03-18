var Scene = function(sceneNum, scenePosX, scenePosY, sceneWidth, sceneHeight, level) {
	// The number of the scene; 1 is top, 2 is bottom.
	this.sceneNum = sceneNum;
	
	// The speed at which the scene scrolls.
	this.speed = 15;
	
	// ?
	this.timePassed = 0;
	
	// ?
	this.objectGenerationTick = 0;
	
	// The position on the Canvas at which the scene is drawn.
	this.sceneDrawY = scenePosY;
	this.sceneDrawX = scenePosX;
	
	// The dimensions of the scene
	this.sceneWidth = sceneWidth;
	this.sceneHeight = sceneHeight;
	
	// The current X position in the level
	this.sceneX = 0;
	
	// Gravitational constant?
	this.gravity = 3;
	
	// The initial X location of the player
	this.initialPlayerX = 250;
	
	// The actual player object
	this.player = new Player(this.initialPlayerX,this.sceneDrawY + this.sceneHeight - 50, this.sceneNum === 1 ? 'assets/Player1.png' : 'assets/Player2.png');
	this.player.y = 0;
	
	// The input buffer for key presses
	this.inputBuffer = {"jump": false, "item":false, "slide": false};
	
	// The current level
	this.level = level;
	
	// The state of the current level
	this.levelState = "countdown";
	
	// The start timestamp
	this.startTimestamp = -1;
	
	//The background image
	this.bkg = new Image();
	this.bkg.src = 'assets/Background.png';
	
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

	// Initializes the starting state of the game
	this.init = function(){

	};
	
	// Pushes a keyboard input to the scene's input buffer
	this.pushInput = function(input){
		if(input in this.inputBuffer)
			this.inputBuffer[input] = true;
	};
	
	// 
	this.popInput = function(input){
		if(input in this.inputBuffer)
			this.inputBuffer[input] = false;
	};
	
	// Simply informs the player which actions it should be taking
	this.callPlayerActions = function(){
		if(this.inputBuffer["jump"]) this.player.jump();
		if(this.inputBuffer["slide"]) this.player.crouch();
		if(this.inputBuffer["item"]) this.player.useItem();
		if(this.inputBuffer["right"]) this.player.moveRight();
		if(this.inputBuffer["left"]) this.player.moveLeft();

	};
	
	// Calls the draw of each entity in the scene, and draws the scene border
	this.draw = function(ctx, scores){
		
		// Draw the scene itself
		ctx.strokeWidth = 5;
		ctx.fillStyle = "green";
		
		ctx.strokeRect(this.sceneDrawX,this.sceneDrawY, this.sceneWidth, this.sceneHeight);
		
		var scrollVal = this.sceneX / 2 % this.sceneWidth;
		ctx.drawImage( this.bkg, scrollVal, 0, this.sceneWidth - scrollVal, this.sceneHeight, this.sceneDrawX, this.sceneDrawY, this.sceneWidth - scrollVal, this.sceneHeight );
		ctx.drawImage( this.bkg, 0, 0, scrollVal, this.sceneHeight, this.sceneDrawX + ( this.sceneWidth - scrollVal), this.sceneDrawY, scrollVal, this.sceneHeight );
		
		if (this.levelState !== "running")
		{
			ctx.font = "20px Comic Sans";
			var message = "";
			var drawX = this.sceneDrawX + 10;
			var drawY = this.sceneDrawY + 30;
			if (this.levelState === "complete")
			{
				message = "Level Complete!";
				ctx.fillStyle = "green";
			}
			else if (this.levelState === "lost")
			{
				message = "Better luck next time...";
				ctx.fillStyle = "red";
			}
			else if (this.levelState === "countdown" && this.startTimestamp !== -1)
			{
				var now = Date.now();
				var delta = this.startTimestamp-now;
				var seconds = Math.round(delta/1000);
				message = "Level begins in " + seconds + "...";
				ctx.fillStyle = "black";
				if (seconds === 0)
				{
					this.levelState = "running";
				}
			}
			ctx.fillText(message, drawX, drawY);
		}
         
		ctx.font = "20px Comic Sans";
         ctx.fillStyle = "black";
         var scoreText = "Score: " + scores[sceneNum];
         var textSize = ctx.measureText(scoreText);
         var drawX = this.sceneDrawX + this.sceneWidth - textSize.width - 10;
         var drawY = this.sceneDrawY + 30;
         ctx.fillText(scoreText, drawX, drawY);
		
		// Draw entities		
		this.player.draw(ctx, this.sceneX, this.sceneDrawY + this.sceneHeight);
		for (var i = this.sceneX; i < this.sceneX + this.sceneWidth; i++) {
			if(this.level.levelEntities[i] !== undefined)
			{
				this.level.levelEntities[i].draw(ctx, this.sceneX, this.sceneDrawY + this.sceneHeight);
			}
		};
	};
	
	// Cleans up objects which are no longer needed
	this.clearArtifacts = function(){

	};
	
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
		
		if (false)
		{
			// Push the player for now
			player.x = entity.x-player.width;
			
			if (player.isDead(this.sceneX))
			{
				this.respawn();
			}
		}
		else
		{
			if (player.y > entity.y)
			{
				// Stop gravity!
				if (player.yVelocity < 0)
				{
					player.yVelocity = 0;
					player.y = entity.y + entity.height;
					player.isJumping = false;
					player.isHighJumping = false;
				}
			}
			else
			{
				// Stop the scene from moving
				this.sceneX -= this.speed;
				this.player.x -= this.speed;
			}
		}
	};
	
	/**
	* Respawn the player.
	**/
	this.respawn = function() {
		this.player.x = this.initialPlayerX + this.sceneX;
	};
	
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
	};
	
	// Check if an entity intersects the player.
	this.intersectsPlayer = function(entity) {
		var noOverlap = (
			entity.x > this.player.x+this.player.width ||
			this.player.x > entity.x+entity.width ||
			entity.y  > this.player.y+this.player.height ||
			this.player.y > entity.y + entity.height
			);
		return !noOverlap;
	};
	
	// Updates the game to the next state
	this.update = function(ctx, scores) {
		
		// Check the state of the level
	 	if (this.levelState !== "running")
		{
			if (this.levelState === "countdown")
			{

			}
			this.draw(ctx, scores);
			return;
		}
		else if (this.sceneX >= level.levelLength)
		{
			// Level complete!
			this.levelState = "complete";
                        scores[sceneNum] += 100;
			this.draw(ctx, scores);
			return;
		}
		
		// Scroll that stuff!
		this.sceneX += this.speed;
		this.player.x += this.speed;
		
		// Tell the player what to do
		this.callPlayerActions();
		
		// Check for collisions
		this.checkCollisions();
		
		// Apply gravity for jumping and crap
		this.player.yVelocity -= this.gravity;
		this.player.y += this.player.yVelocity;
		if( ( this.player.y ) < 0)
		{
			this.player.y = 0;
			this.player.yVelocity = 0;
			this.player.isJumping = false;
			this.player.isHighJumping = false;
		}
		
		// Draw everything
		this.draw(ctx, scores);
		
		// Don't move the obstacles anymore.
		//this.moveObstacles();
	};
};
var Player = function(xPosition, yPosition, source){
	
	// The location of the player, in level space
	this.x = xPosition;
	this.y = yPosition;
	
	// The width and height of the player (arbitrary for now?)
	this.width = 32;
	this.height = 64;
	
	// The image of the player
	this.img = new Image();
	this.img.src = source;
	
	// The Y velocity of the player
	this.yVelocity = 0;
	
	// Is the player jumping
	this.isJumping = false;
	this.isHighJumping = false;
	
	// Jumping related variables
	this.jumpStartTime = frameCount;
	this.jumpHeight = 1;
	
	/**
	* Is the player dead.
	* @return If the player is dead.
	**/
	this.isDead = function(sceneX) {
		return this.x <= sceneX;
	}

	this.jump = function(){
		
		if( !this.isJumping )
		{
			this.yVelocity = 17;
			this.isJumping = true;
			//get the time the player begins to jump.
			this.jumpStartTime = frameCount;
		}
		//high jumping
		var timeDif = Math.abs(this.jumpStartTime - frameCount);
		if( this.yVelocity > 0 && timeDif < 6 && timeDif > 1)
		{
			if(timeDif != 0)
				this.yVelocity += .6 * (8 - timeDif);
		}
	}
	//causes the player to slide forward
	this.slide = function(){

		if(this.x <= 1780 -this.width){

			this.x+=30;

		}

	}

	this.moveRight = function(){

		if(this.x <= 1780 -this.width){

			this.x+=10;

		}
	}

	this.moveLeft = function(){
		if(this.x >= 20 + this.width){

			this.x-=10;

		}
	}

	//causes the player to use his item
	this.useItem = function(){

	}
	this.handleInput = function(){
		
	}
	this.draw = function(ctx, xOffset, yOffset){
		//constant color, can change
		ctx.fillStyle = "blue";
		//console.log( "drawing player at " + (this.x - xOffset));
		ctx.drawImage( this.img, this.x - xOffset, yOffset - ( this.y + this.height), this.width, this.height );
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
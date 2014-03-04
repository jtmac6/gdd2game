var Player = function(xPosition, yPosition, source){
	this.x = xPosition;
	this.y = yPosition;
	//constant values, arbitrary for now
	this.width = 32;
	this.height = 64;
	this.img = new Image();
	this.img.src = source;
	this.yvelocity = 0;
	this.isJumping = false;
	this.isHighJumping = false;
	this.jumpStartTime = frameCount;
	this.jumpheight = 1;
	
	/**
	* Is the player dead.
	* @return If the player is dead.
	**/
	this.isDead = function() {
		return this.x < 0;
	}

	this.jump = function(){
		
		if( !this.isJumping )
		{
			this.yvelocity = 17;
			this.isJumping = true;
			//get the time the player begins to jump.
			this.jumpStartTime = frameCount;
		}
		//high jumping
		var timeDif = Math.abs(this.jumpStartTime - frameCount);
		if( this.yvelocity > 0 && timeDif < 6 && timeDif > 1)
		{
			console.log(timeDif);
			if(timeDif != 0)
				this.yvelocity += .6 * (8 - timeDif);
		}
	}
	//causes the player to slide forward
	this.slide = function(){

	}

	this.moveRight = function(){

		if(this.player.x <= 1780){

			this.x+=10

		}
	}

	this.moveLeft = function(){
		if(this.x >= 20){

			this.x-=10

		}
	}

	//causes the player to use his item
	this.useItem = function(){

	}
	this.handleInput = function(){
		
	}
	this.draw = function(ctx){
		//constant color, can change
		ctx.fillStyle = "blue";
		
		ctx.drawImage( this.img, this.x, this.y, this.width, this.height );
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
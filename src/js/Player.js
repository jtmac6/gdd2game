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
	this.jumpStartTime = new Date().getTime();
	this.jumpheight = 1;
	this.jump = function(){
		
		if( !this.isJumping )
		{
			this.yvelocity = 10;
			this.isJumping = true;
			//get the time the player begins to jump.
			this.jumpStartTime = new Date().getTime();
		}
		//high jumping
		var timeDif = Math.abs(this.jumpStartTime - new Date().getTime());
		if( this.yvelocity > 0 && timeDif < 300 && timeDif > 60)
		{
			if(timeDif != 0)
				this.yvelocity += .04 * (300 - timeDif);
		}
	}
	//causes the player to slide forward
	this.slide = function(){

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
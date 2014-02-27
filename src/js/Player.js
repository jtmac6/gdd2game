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
	this.jumpheight = 1;

	this.jump = function(){
		
		if( !this.isJumping )
		{
			this.yvelocity = 20;
			this.isJumping = true;
		}
	}
	
	this.moveUp = function(){
        //WE DUN NEED DIS
		
	}
	this.moveDown = function(){
        //OR DIS
	}
	this.moveLeft = function(){
        //AND PROBABLY DIS
		this.x -= 1;
	}
	this.moveRight = function(){
        //DIS ONE TOO
		this.x += 1;
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
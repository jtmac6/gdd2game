var Player = function(xPosition, yPosition, source){
	this.x = xPosition;
	this.y = yPosition;
	//constant values, arbitrary for now
	this.width = 25;
	this.height = 50;
	this.img = new Image();
	this.img.src = source;
	this.isJumping = false;
	this.jumpheight = 1;

	this.jump = function(){
		if(!this.isJumping){
			this.isJumping = true;
			this.y -= 50;
			setTimeout(this.land, 500);
		}
	}
	
	this.land = function(){
		isJumping = false;
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
		
		if(this.isJumping){
			this.y -= this.jumpheight;
		}
		
		ctx.drawImage( this.img, this.x, this.y, this.width, this.height );
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
var Player = function(xPosition, yPosition){
	this.x = xPosition;
	this.y = yPosition;
	//constant values, arbitrary for now
	this.width = 50;
	this.height = 100;
	this.isJumping = false;

	this.jump = function(){

	}
	this.moveUp = function(){

	}
	this.moveDown = function(){

	}
	this.moveLeft = function(){

	}
	this.moveRight = function(){

	}
	this.handleInput = function(){
		
	}
	this.draw = function(ctx){
		//constant color, can change
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
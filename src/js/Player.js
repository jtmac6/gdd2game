var Player = function(xPosition, yPosition){
	this.x = xPosition;
	this.y = yPosition;
	//constant values, arbitrary for now
	this.width = 25;
	this.height = 50;
	this.isJumping = false;

	this.jump = function(){

	}
	this.moveUp = function(){
        //WE DUN NEED DIS
	}
	this.moveDown = function(){
        //OR DIS
	}
	this.moveLeft = function(){
        //AND PROBABLY DIS
	}
	this.moveRight = function(){
        //DIS ONE TOO
	}
	this.handleInput = function(){
		
	}
	this.draw = function(ctx){
		//constant color, can change
		ctx.fillStyle = "blue";
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
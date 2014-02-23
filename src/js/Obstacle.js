var Obstacle = function(xPosition, yPosition, width, height, breakable){
	this.x = xPosition;
	this.y = yPosition;
	this.width = width;
	this.height = height;
	//this will likely not be used in the Prototype
	this.isBreakable = breakable;
	//be very clear on what is breakable
	this.color = breakable ? "red" : "yellow";

	this.draw = function(ctx){
		ctx.fillStyle = this.color;
		ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
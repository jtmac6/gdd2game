var Obstacle = function(xPosition, yPosition, width, height, source, breakable){
	// The location of the obstacle, in Level space!
	this.x = xPosition;
	this.y = yPosition;
	
	// The dimensions of the Obstacle
	this.width = width;
	this.height = height;
	
	// The image of the obstacle
	this.img = new Image();
	this.img.src = source;
	
	// This will likely not be used in the Prototype
	this.isBreakable = breakable;
	// Be very clear on what is breakable
	this.color = breakable ? "red" : "yellow";

	// Draw the obstacle
	this.draw = function(ctx, xOffset, yOffset){
		ctx.fillStyle = this.color;
		ctx.drawImage( this.img, this.x - xOffset, yOffset - ( this.y + this.height ), this.width, this.height );
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
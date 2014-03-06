var Obstacle = function(xPosition, yPosition, width, height, source, breakable){
	this.x = xPosition; // in LEVEL space, not scene space
	this.y = yPosition;
	this.width = width;
	this.height = height;
	this.img = new Image();
	this.img.src = source;
	//this will likely not be used in the Prototype
	this.isBreakable = breakable;
	//be very clear on what is breakable
	this.color = breakable ? "red" : "yellow";

	this.draw = function(ctx, xOffset){
		ctx.fillStyle = this.color;
		ctx.drawImage( this.img, this.x - xOffset, this.y, this.width, this.height );
		//ctx.fillRect(this.x, this.y, this.width, this.height);
	}
}
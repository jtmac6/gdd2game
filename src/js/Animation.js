var Animation = function(offset, baseImage, height, runSrc, runSize, runFrames, jumpSrc, jumpSize, jumpFrames, slideSrc, slideSize, slideFrames){

	this.curFrame = 0;
	this.offSet = offset;
	this.state = "none";
	this.height = height;
	
	//loading images into arrays for animation
	this.base = new Image();
	this.base.src = baseImage;
	
	this.run = new Image();
	this.run.src = runSrc;
	this.runSize = runSize;
	this.runFrames = runFrames;
	
	this.jump = new Image();
	this.jump.src = jumpSrc;
	this.jumpSize = jumpSize;
	this.jumpFrames = jumpFrames;
	
	this.slide = new Image();
	this.slide.src = slideSrc;
	this.slideSize = slideSize;
	this.slideFrames = slideFrames;
	
	this.animate = function()
	{
		this.curFrame++;
	}
	
	this.changeState = function( state )
	{
		this.state = state;
		this.curFrame = 0;
	}
	
	this.draw = function( ctx, x, y, height, width )
	{
		if( this.state === "run" )
		{
			ctx.drawImage( this.run, 
						  this.runSize * ( this.curFrame / this.offset ) % this.runFrames, 
						  0,
						  this.runSize,
						  this.height,
						  x, 
						  y, 
						  width, 
						  height );
		}
		else if( this.state === "jump" )
		{
			ctx.drawImage( this.jump, 
						  this.jumpSize * ( this.curFrame / this.offset ) % this.jumpFrames, 
						  0,
						  this.jumpSize,
						  this.height,
						  x, 
						  y, 
						  width, 
						  height );
		}
		else if( this.state === "slide" )
		{
			ctx.drawImage( this.slide, 
						  this.slideSize * ( this.curFrame / this.offset ) % this.slideFrames, 
						  0,
						  this.slideSize,
						  this.height,
						  x, 
						  y, 
						  width, 
						  height );
		}
		else
		{
			ctx.drawImage( this.base, x, y, width, height );
		}
	}

};
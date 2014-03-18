var Animation = function(runSrc, runSize, runFrames, jumpSrc, jumpSize, jumpFrames, slideSrc, slideSize, slideFrames){

	this.currFrame = 0;
	this.offSet = 2;
	
	//loading images into arrays for animation
	this.player1Run = new Array();
	this.player2Run = new Array();
	this.player1Slide = new Array();
	this.player2Slide = new Array();
	this.player1Jump = new Array();
	this.player2Jump = new Array();
	
	this.runSprites = new Image();
	this.runSprites.src = runSrc;
	this.runSpritesOffset = runSize;
	this.runSpritesFrames = runFrames;
	
	this.player1Run[0] = new Image();
	this.player1Run[0].src = 'assets/Run1-0.png';
	this.player1Run[1] = new Image();
	this.player1Run[1].src = 'assets/Run1-1.png';
	this.player1Run[2] = new Image();
	this.player1Run[2].src = 'assets/Run1-2.png';
	
	this.player2Run[0] = new Image();
	this.player2Run[0].src = 'assets/Run2-0.png';
	this.player2Run[1] = new Image();
	this.player2Run[1].src = 'assets/Run2-1.png';
	this.player2Run[2] = new Image();
	this.player2Run[2].src = 'assets/Run2-2.png';
	
	this.player1Slide[0] = new Image();
	this.player1Slide[0].src = 'assets/Slide1-0.png';
	this.player1Slide[1] = new Image();
	this.player1Slide[1].src = 'assets/Slide1-1.png';
	
	this.player2Slide[0] = new Image();
	this.player2Slide[0].src = 'assets/Slide2-0.png';
	this.player2Slide[1] = new Image();
	this.player2Slide[2].src = 'assets/Slide2-1.png';
	
	this.player1Jump[0] = new Image();
	this.player1Jump[0].src = 'assets/Jump1-0.png';
	this.player2Jump[0] = new Image();
	this.player1Jump[0].src = 'assets/Jump2-0.png';
	
	this.animate = function(state)
	{
		currFrame++;
		
	}
	
	this.draw = function( ctx, x, y, height, state )
	{
		if( state === "running" )
		{
		
		}
	}

};
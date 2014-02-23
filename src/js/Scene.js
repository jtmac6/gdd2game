var Scene = function(sceneNum){
	this.sceneNum = sceneNum;
	this.gameEntities = [];
	this.player = new Player(50,sceneNum == 1 ? 50 : window.innerHeight / 3 + 50);
	
	//initializes the starting state of the game
	this.init = function(){

	}
	//calls the draw of each entity in the scene
	this.draw = function(ctx){
		//draw the screen itself
		ctx.strokeWidth = 5;
		ctx.fillStyle = "green";
		if(sceneNum == 1){
			ctx.strokeRect(10,10,window.innerWidth - 20, window.innerHeight / 3);
		}
		else{
			ctx.strokeRect(10,window.innerHeight / 3 + 20,window.innerWidth - 20, window.innerHeight / 3);
		}
		//draw entities
		this.player.draw(ctx);
		for (var i = this.gameEntities.length - 1; i >= 0; i--) {
			this.gameEntities[i].draw();
		};
	}
	//cleans up objects which are no longer needed
	this.clearArtifacts = function(){

	}
	//moves that static obstacles in the scene to the left
	this.moveObstacles = function(){

	}
	//creates new objects in the scene
	this.generateNewObjects = function(){

	}
	//checks collisions, also resolves them
	this.checkCollisions = function(){

	}
	//updates the game to the next state
	this.update = function(ctx){
		this.draw(ctx);
	}
}
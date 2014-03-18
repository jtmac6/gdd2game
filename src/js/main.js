"use strict";
window.onload = init;

// Global game variables

// The top scene
var scene1;

// The bottom scene
var scene2;

// The Canvas drawing context
var ctx;

// The update interval, in Milliseconds
var updateIntervalMillis = 60;

// ?
var frameCount = 0;

// The current game state (menu, running, paused, etc.)
var state;

// The current level of the game.
var currentLevel; 

// The current position of the mouse.
var mousePos;

// Is the mouse intercepting a menu button
var intercepting = {};

// Has the current level been complete.
var levelComplete = false;

// How long is the next level going to be?
var nextLevelLength = 2000;

// End global game variables

/*
* The init function that starts the game.
*/
function init() {
	
	// Grab our canvas.
	var canvas = document.getElementById('canvas');
	
	// Make the canvas fullscreen
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	ctx = canvas.getContext('2d');
	
	// Prepare the initial level
	prepareNextLevel();
	
	state = "menu";
	
	document.addEventListener('keydown', function(event) {
		if(state == "game"){
			// player 1 jump
			
			// console.log(event.keyCode);
			
			if(event.keyCode == 87) {
				//alert('w was pressed');
				scene1.pushInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 83) {
				//use item
				scene1.pushInput("item");
				//alert('a was pressed');
			}

			//player 1 move left
			if(event.keyCode == 65) {
				//alert('a was pressed');
				scene1.pushInput("left");
			}
			//player 1 move right
			if(event.keyCode == 68) {
				//use item
				scene1.pushInput("right");
				//alert('x was pressed');
			}


			// player 2 jump
			if(event.keyCode == 38) {
				//alert('w was pressed');
				scene2.pushInput("jump");
			}
			//player 2 use item
			if(event.keyCode == 40) {
				//use item
				scene2.pushInput("item");
				//alert('a was pressed');
			}

			//player 2 move left
			if(event.keyCode == 37) {
				//alert('a was pressed');
				scene2.pushInput("left");
			}
			//player 2 move right
			if(event.keyCode == 39) {
				//use item
				scene2.pushInput("right");
				//alert('x was pressed');
			}
			//pause if space is pressed
			if(event.keyCode == 32){
				state = "pause";
			}
		}
		else if(state == "pause")
			//unpause if space is pressed
			if(event.keyCode == 32){
				startLevel();
			}
	});
	document.addEventListener('keyup', function(event){
		// player 1 jump
		if(state == "game"){
			if(event.keyCode == 87) {
				scene1.popInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 83) {
				//use item
				scene1.popInput("item");
				//alert('a was pressed');
			}

			//player 1 move left
			if(event.keyCode == 65) {
				//alert('a was pressed');
				scene1.popInput("left");
			}
			//player 1 move right
			if(event.keyCode == 68) {
				//use item
				scene1.popInput("right");
				//alert('x was pressed');
			}


			// player 2 jump
			if(event.keyCode == 38) {
				//alert('w was pressed');
				scene2.popInput("jump");
			}
			//player 2 use item
			if(event.keyCode == 40) {
				//use item
				scene2.popInput("item");
				//alert('a was pressed');
			}

			//player 2 move left
			if(event.keyCode == 37) {
				//alert('a was pressed');
				scene2.popInput("left");
			}
			//player 2 move right
			if(event.keyCode == 39) {
				//use item
				scene2.popInput("right");
				//alert('x was pressed');
			}
		}
	});
	document.addEventListener('click', function(event) {
		/*if (intercepting) {
			if(state === "menu") {
				state = "game";
			}
			else if (state === "game" && levelComplete) {
				prepareNextLevel();
				levelComplete = false;
			}
		}*/
		for (var key in intercepting) {
			if (intercepting[key]) {
				
				// You can only click one button!
				// So reset all the other after a click
				for (var key2 in intercepting) {
					intercepting[key2] = false;
				}
				
				if (key == "exit") {
					state = "menu";
					prepareNextLevel();
				}
				else {
					if(state === "menu") {
						startLevel();
					}
					else if (state === "game" && levelComplete) {
						prepareNextLevel();
						startLevel();
					}
				}
 			}
		}
	});
	canvas.addEventListener('mousemove', function(evt) {
        getMousePos(canvas, evt);
      }, false);
	window.setInterval(update, updateIntervalMillis);
	

	
	// We'll need to listen for when the page is resized and adjust accordingly.
}

function prepareNextLevel() {
	// Initialize the level
	currentLevel = new Level( nextLevelLength, 100, 500, 20 );
	nextLevelLength += 1000;

	// Initialize the scene
	//scene1 = new Scene(1,10, 10, 1800, 300, Level);
	//scene2 = new Scene(2,10, 320, 1800, 300, Level);
	
	// Lets make the width dynamic for people with smaller screens ;)
	scene1 = new Scene(1,10, 10, canvas.width - 25, 300, currentLevel);
	scene2 = new Scene(2,10, 320, canvas.width - 25, 300, currentLevel);
	levelComplete = false;
}

function startLevel() {
	var startTimestamp = Date.now() + 3500;
	scene1.startTimestamp = startTimestamp;
	scene2.startTimestamp = startTimestamp;
	state = "game";
}

function update(){
	// Not clearing the screen causes the "Pause" text to get REALLY fat; we can address this later, just clear the screen for now.
	if(state != "pause" || true)  {
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	}
	if(state == "game"){
		++frameCount;
		scene1.update(ctx);
		scene2.update(ctx);
		
		// Check if either player has completed the current level.
		// If one has, make the other lose.
		if (!levelComplete) {
			if (scene1.levelState == "complete") {
				scene2.levelState = "lost";
				levelComplete = true;
			}
			else if (scene2.levelState == "complete") {
				scene1.levelState = "lost";
				levelComplete = true;
			}
		}
		else
		{
			// Draw the "next level" screen over the ended game
			drawMenu("next", "Next Level", 0, -130, true);
			
			drawMenu("exit", "Exit Game", 0, +130, true);
		}
		
	}
	else if(state == "menu"){
		ctx.font = "50px Comic Sans";
		ctx.fillStyle = "#0020A1";
		drawCenteredText("Spy Runner", 50);
		ctx.font = "15px Comic Sans";
		drawCenteredText("Do you have what it takes to win?", 80);
		
		ctx.fillStyle = "#000000";
		drawCenteredText("Please select an option from the list below.",  (canvas.height / 2) - 70);
		drawMenu("play", "Play!", 0, 0, true);
	}
	else if(state == "pause"){
		ctx.font = "42px Comic Sans";
		ctx.fillStyle = "#000";
		var pauseText = "Paused";
		var textSize = ctx.measureText(pauseText);
		ctx.fillText(pauseText, (canvas.width / 2) - (textSize.width / 2), canvas.height /2);
	}
	else if(state == "gameover"){
		//gameover screen
	}
}

function drawCenteredText(message, y) {
	var textSize = ctx.measureText(message);
	var textX = (canvas.width / 2) - (textSize.width / 2);
	var textHeight = 40;
	var textY = y;
	ctx.fillText(message, textX, textY);
}

function drawMenu(name, menuText, xOffset, yOffset, interceptable) {
	ctx.font = "42px Comic Sans";
	if(intercepting[name] && interceptable){
		ctx.fillStyle = "#F00";
	} else { 
		ctx.fillStyle = "#000";
	}
	var textSize = ctx.measureText(menuText);
	var textX = (canvas.width / 2) - (textSize.width / 2) + xOffset;
	var textHeight = 40;
	var textY = (canvas.height / 2) - (textHeight / 2) + yOffset;

	if (interceptable)
	{
		intercepting[name] = interceptsWithMouse(textX, textY - textHeight, textSize.width, textHeight);
	}
	
	
	ctx.fillText(menuText, textX, textY);
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    mousePos = {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

function interceptsWithMouse(xPos, yPos, width, height){
	if(mousePos === undefined) return false;
	if (
	mousePos.x >= xPos &&
	mousePos.x <= xPos + width &&
	mousePos.y >= yPos &&
	mousePos.y <= yPos + height) {
		return true;
	}
	return false;
}
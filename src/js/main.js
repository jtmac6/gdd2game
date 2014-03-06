"use strict";
window.onload = init;
var scene1;
var scene2;
var ctx;
var milis = 60;
var frameCount = 0;
enum States{
	menu = 1;
	game = 2;
	pause = 3;
	gameOver = 4;
}
var state;
function init() {
	// Grab our canvas.
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	state = States.menu;
	scene1 = new Scene(1,10, 10, 1800, 300);
	scene2 = new Scene(2,10, 320, 1800, 300 );
	// Make the canvas fullscreen
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.addEventListener('keydown', function(event) {
			// player 1 jump
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


			// player 1 jump
			if(event.keyCode == 38) {
				//alert('w was pressed');
				scene1.pushInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 40) {
				//use item
				scene1.pushInput("item");
				//alert('a was pressed');
			}

			//player 1 move left
			if(event.keyCode == 37) {
				//alert('a was pressed');
				scene1.pushInput("left");
			}
			//player 1 move right
			if(event.keyCode == 39) {
				//use item
				scene1.pushInput("right");
				//alert('x was pressed');
			}

	});
	document.addEventListener('keyup', function(event){
		// player 1 jump
			if(event.keyCode == 87) {
				//alert('w was pressed');
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


			// player 1 jump
			if(event.keyCode == 38) {
				//alert('w was pressed');
				scene1.popInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 40) {
				//use item
				scene1.popInput("item");
				//alert('a was pressed');
			}

			//player 1 move left
			if(event.keyCode == 37) {
				//alert('a was pressed');
				scene1.popInput("left");
			}
			//player 1 move right
			if(event.keyCode == 39) {
				//use item
				scene1.popInput("right");
				//alert('x was pressed');
			}
	});
	window.setInterval(update, milis);
	

	
	// We'll need to listen for when the page is resized and adjust accordingly.
}

function update(){
	if(state == States.game){
		++frameCount;
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		scene1.update(ctx);
		scene2.update(ctx);
	}
	else if(state == States.menu){
		//draw menus
	}
	else if(state == States.pause){
		//pause
	}
	else if(state == States.gameOver){
		//gameover screen
	}

	}
}
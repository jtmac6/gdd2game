"use strict";
window.onload = init;
var scene1;
var scene2;
var ctx;
var milis = 60;
var frameCount = 0;
function init() {
	// Grab our canvas.
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	scene1 = new Scene(1,10, 10, 1800, 300);
	scene2 = new Scene(2,10, 320, 1800, 300 );
	// Make the canvas fullscreen
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	document.addEventListener('keydown', function(event) {
			// player 1 jump
			if(event.keyCode == 90) {
				//alert('z was pressed');
				scene1.pushInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 88) {
				//use item
				scene1.pushInput("item");
				//alert('x was pressed');
			}
			//player 2 jump
			if(event.keyCode == 97) {
				scene2.pushInput("jump");
				//alert('x was pressed');
			}
			//player 2 use item
			if(event.keyCode == 98) {
				//use item
				scene2.pushInput("item");
				//alert('x was pressed');
			}
	});
	document.addEventListener('keyup', function(event){
		// player 1 jump
			if(event.keyCode == 90) {
				//alert('z was pressed');
				scene1.popInput("jump");
			}
			//player 1 use item
			if(event.keyCode == 88) {
				//use item
				scene1.popInput("item");
				//alert('x was pressed');
			}
			//player 2 jump
			if(event.keyCode == 97) {
				scene2.popInput("jump");
				//alert('x was pressed');
			}
			//player 2 use item
			if(event.keyCode == 98) {
				//use item
				scene2.popInput("item");
				//alert('x was pressed');
			}
	});
	window.setInterval(update, milis);
	

	
	// We'll need to listen for when the page is resized and adjust accordingly.
}

function update(){
	++frameCount;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene1.update(ctx);
	scene2.update(ctx);
}
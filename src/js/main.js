"use strict";
window.onload = init;
var scene1;
var scene2;
var ctx;
var milis = 60;

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
			if(event.keyCode == 90) {
				scene1.player.jump();
				//alert('z was pressed');
			}
			else if(event.keyCode == 88) {
				//use item
				//alert('x was pressed');
			}
			
			else if(event.keyCode == 97) {
				scene2.player.jump();
				//alert('x was pressed');
			}
			
			else if(event.keyCode == 98) {
				//use item
				//alert('x was pressed');
			}
	});
	
	window.setInterval(update, milis);
	

	
	// We'll need to listen for when the page is resized and adjust accordingly.
}

function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene1.update(ctx);
	scene2.update(ctx);
}
"use strict";
window.onload = init;
var scene1;
var scene2;
var ctx;
function init() {
	// Grab our canvas.
	var canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	scene1 = new Scene(1);
	scene2 = new Scene(2);
	// Make the canvas fullscreen
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.setInterval(update, 60);
	
	// We'll need to listen for when the page is resized and adjust accordingly.
}

function update(){
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	scene1.update(ctx);
	scene2.update(ctx);
}
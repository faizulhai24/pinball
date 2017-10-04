var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_WIDTH = 10;

const KEYBOARD_SENSTIVITY = 100;

function calculateMousePos(evt) {
	var rect = canvas.getBoundingClientRect();
	var root = document.documentElement;
	var mouseX = evt.clientX - rect.left - root.scrollLeft;
	var mouseY = evt.clientY - rect.top - root.scrollTop;
	return {
		x: mouseX,
		y: mouseY
	}
}

function keyPressed(evt) {
	switch (evt.keyCode) {
		case 38: 
			if (paddle2Y < 0) return;
			paddle2Y = paddle2Y - KEYBOARD_SENSTIVITY;
			break;
		case 40:
			if (paddle2Y >= canvas.height - PADDLE_HEIGHT) return;
			paddle2Y = paddle2Y + KEYBOARD_SENSTIVITY;
			break;
	}
}

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 60;
	setInterval((() => {moveEverything(); drawEverything();}), 1000/framesPerSecond);
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
	});

	setInterval((() => {
		ballSpeedX += 2;
		ballSpeedY += 1;
	}), 10000);
	document.addEventListener('keydown', keyPressed);
}

function ballReset() {
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function moveEverything() {
	ballX += ballSpeedX;
	if (ballX >= canvas.width) {
		if (ballY > paddle2Y - 50 && ballY < (paddle2Y + PADDLE_HEIGHT + 50)) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
		}
	}
	if (ballX <= 0) {
		if (ballY > paddle1Y && ballY < (paddle1Y + PADDLE_HEIGHT)) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
		}
	}

	ballY += ballSpeedY;
	if (ballY > canvas.height) {
		ballSpeedY = -ballSpeedY;
	}
	if (ballY < 0) {
		ballSpeedY = -ballSpeedY;
	}
}

function drawEverything() {
	// the black area
	colorRect(0, 0, canvas.width, canvas.height, 'black');

	// left player paddle
	colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, 'white');
	
	// ball
	colorCircle(ballX, ballY, 10, 'white');
}

function colorRect(leftX, topY, width, height, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.fillRect(leftX, topY, width, height);
}

function colorCircle(centerX, centerY, radius, drawColor) {
	canvasContext.fillStyle = drawColor;
	canvasContext.beginPath();
	canvasContext.arc(centerX, centerY, radius, 0 * Math.PI, 2 * Math.PI, true);
	canvasContext.fill()
}

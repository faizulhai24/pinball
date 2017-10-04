var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var paddle1Y = 250;
const PADDLE_HEIGHT = 100;

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

window.onload = function(){
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');

	var framesPerSecond = 60;
	setInterval((() => {moveEverything(); drawEverything();}), 1000/framesPerSecond);
	canvas.addEventListener('mousemove', function(evt) {
		var mousePos = calculateMousePos(evt);
		paddle1Y = mousePos.y - (PADDLE_HEIGHT/2);
	});
}

function ballReset() {
	ballSpeedX = -ballSpeedX;
	ballX = canvas.width / 2;
	ballY = canvas.height / 2;
}

function moveEverything() {
	ballX += ballSpeedX;
	if (ballX >= canvas.width) {
		ballSpeedX = -ballSpeedX;
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
	colorRect(0, paddle1Y, 10, PADDLE_HEIGHT, 'white');
	
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

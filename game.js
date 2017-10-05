var canvas;
var canvasContext;
var ballX = 50;
var ballY = 50;
var ballSpeedX = 10;
var ballSpeedY = 5;

var paddle1Y = 250;
var paddle2Y = 250;
const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;

var player1Score = 0;
var player2Score = 0;

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

// function keyPressed(evt) {
// 	switch (evt.keyCode) {
// 		case 38: 
// 			if (paddle2Y < 0) return;
// 			paddle2Y = paddle2Y - KEYBOARD_SENSTIVITY;
// 			break;
// 		case 40:
// 			if (paddle2Y >= canvas.height - PADDLE_HEIGHT) return;
// 			paddle2Y = paddle2Y + KEYBOARD_SENSTIVITY;
// 			break;
// 	}
// }

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

function computerMovement() {
	var paddle2YCenter = paddle2Y + (PADDLE_HEIGHT/2);
	if (paddle2YCenter < ballY - 35) {
		paddle2Y += 5;
	} else if(paddle2YCenter > ballY + 35) {
		paddle2Y -= 5;
	}
}

function moveEverything() {
	computerMovement();
	ballX += ballSpeedX;
	ballY += ballSpeedY;

	if (ballX >= canvas.width) {
		if (ballY > paddle2Y &&
				ballY < (paddle2Y + PADDLE_HEIGHT)) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
			player1Score++;
		}
	}

	if (ballX <= 0) {
		if (ballY > paddle1Y &&
				ballY < (paddle1Y + PADDLE_HEIGHT)) {
			ballSpeedX = -ballSpeedX;
		} else {
			ballReset();
			player2Score++;
		}
	}

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
	colorRect(0, paddle1Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	colorRect(canvas.width - PADDLE_THICKNESS, paddle2Y, PADDLE_THICKNESS, PADDLE_HEIGHT, 'white');
	
	// ball
	colorCircle(ballX, ballY, 10, 'white');
	canvasContext.fillText('Score: Player 1 - Player 2', 350, 50);
	canvasContext.fillText(player1Score + ' - ' + player2Score, 400, 70);
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

const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d");
const FPS = 25;
	canvas.width = document.documentElement.clientWidth;
	canvas.height = document.documentElement.clientHeight; 
	context.fillRect(0, 0, canvas.width, canvas.height);

var refWindow = new ReferenceWindow (true); 
var platform = new Platform(canvas.width/2-100, canvas.height - 30, 200,20);
var ball = new Ball(platform.x, platform.y-20, 20);
var currTr ;

var SCORE = 0;
var _game_status = 0; // 1 - game started, 0 - game didn't start

document.addEventListener("mousemove", function (e) {platform.x = e.clientX<=canvas.width-platform.width?e.clientX:canvas.width-platform.width;});
document.addEventListener("keydown", function (e) {
	if (e.keyCode == 32 && _game_status == 0) {
		gameStart();
	}
});
document.addEventListener("click", function (e) {
	if (_game_status == 0) {
		gameStart();
	}
});


function draw () {
	context.fillStyle = "black";
	context.fillRect(0,0,canvas.width, canvas.height);
	platform.draw();

	if (_game_status == 1) {

		ball.x+=currTr.step;		
		ball.y = canvas.height - currTr.getNextPos(ball.x);
		ball.draw();
		switch (isWallTouch()) {
			case 1: // left wall 
				currTr = new CurrTraject (-currTr.k, ball.x,canvas.height - ball.y, -currTr.step);				
			break;
			case 2: // up wall
				currTr = new CurrTraject (-currTr.k, ball.x,canvas.height - ball.y, currTr.step);				
			break;
			case 3: // right wall
				currTr = new CurrTraject (-currTr.k, ball.x,canvas.height - ball.y, -currTr.step);				
			break;
			case 4: // dow wall
				gameOver();			
			break;
			case 5: // platform touch
				currTr = new CurrTraject (-currTr.k, ball.x,canvas.height - ball.y, currTr.step);				
			break;
		}
			

		
	} else {
		ball.x = platform.x+platform.width/2;
		ball.y = platform.y-20;
		refWindow.draw();
		ball.draw();
	}

	context.font = "22px Verdana";
	context.fillText(`Score: ${SCORE}`, 20, 50);
}

function isWallTouch () {
	if ((ball.x-ball.r) <= 0) return 1;
	if ((ball.y-ball.r) <= 0) return 2;
	if ((ball.x+ball.r) >= canvas.width) return 3;
	if ((ball.y+ball.r) >= canvas.height) return 4;
	if (((ball.y+ball.r) >= platform.y) && ((ball.x>=platform.x)&&(ball.x<=platform.x+platform.width))) return 5;
}
function gameOver () {
	_game_status = 0;
}
function gameStart () {
	_game_status = 1;
	let k = Math.pow(-1, Math.floor(Math.random()*10)); // 1 or -1
	currTr = new CurrTraject(k, ball.x,canvas.height - ball.y, k*ball.speed);
}
setInterval(draw, 1000/FPS);



class Platform {
	constructor (x, y, width, height ) {
		this.width = width;
		this.height = height;
		this.x = x;
		this.y = y;
	}

	draw () {
		context.fillStyle = "white";
		context.fillRect(this.x, this.y, this.width, this.height);
	}
}

class Ball {

	constructor (x, y , r) {
		this.x = x;
		this.y = y;
		this.r = r;
	}

	draw () {
		context.fillStyle = "white";
		context.beginPath();
		context.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
		context.fill();
	}
} 

class CurrTraject {
	constructor (k, start_x, start_y, step) {
		/*
			k - angular coefficient
			dir = 1 - right
			dir = -1 - left
			dir = 0 - up
		*/
		this.k = k;
		this.start_x = start_x;
		this.start_y = start_y;
		this.step = step;
	}
	getNextPos(x) {
		return this.k*(x-this.start_x)+this.start_y;
	}
}

class ReferenceWindow {
	constructor (show) {
		this.show = show;
		this.width = canvas.width/100*50; // 50% 
		this.height = canvas.height/100*40;
		this.text = ["A, D - Platform control","W - Increase ball speed","Space/ Mouse click - Start game"];
	}
	draw () {
		let x = canvas.width/2 - this.width/2;
		let y = 100;
		context.fillStyle = "rgba(249, 170, 211, 0.17)";
		context.beginPath();
		context.rect(x, y, this.width, this.height);
		context.fill();
		context.strokeStyle = context.fillStyle;
		context.lineJoin = 'round';
		context.lineWidth = 10;
		context.stroke();

		context.fillStyle = "white";
		context.font = "19px Verdana";
		for (var i = 0; i < this.text.length; i++) {
			context.fillText(this.text[i], x+60, y+90+i*25);
		}
	}
}
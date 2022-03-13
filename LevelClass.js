var levels = [
	{number: 1, speed: 3, pattern: [3,5,5,3]}
];

class Level {
	constructor (number, levels) {
		this.number = number;
		this._pattern = levels[number].pattern;
		this._speed = levels[number].speed;
	}
	draw () {
		
	}
}
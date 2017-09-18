class Bullet {

	constructor(screenPosition, target) {
		this._screenPosition = screenPosition;
		this._target = target;

		this._width = 3;
		this._height = 3;

		this._speed = 5;
	}

	update(elapsed) {
		this.run(elapsed);
	}

	draw(context, selected) {
		context.save();

		context.beginPath();
		context.rect(this._screenPosition.x, this._screenPosition.y, this._width, this._height);
		context.fillStyle = 'red';
		context.fill();

		if (selected) {
			context.strokeStyle = 'green';
			context.lineWidth = 2;
		}
		context.stroke();

		context.restore();
	}

	run(elapsed) {
		let deltaX = this._target.screenPositionCenter.x - this._screenPosition.x;
		let deltaY = this._target.screenPositionCenter.y - this._screenPosition.y;

		let distace = Math.abs(deltaX) + Math.abs(deltaY);
		let speed = this._speed * elapsed / 10;

		if (distace > speed) {
			let angle = Math.atan2(deltaY, deltaX);

			deltaX = Math.cos(angle) * speed;
			deltaY = Math.sin(angle) * speed;
		}

		this._screenPosition.x += deltaX;
		this._screenPosition.y += deltaY;
	}

	get screenPosition() {
		return this._screenPosition;
	}

	set screenPosition(value) {
		this._screenPosition = value;
		this._position.x = Math.floor(this._screenPosition.x / this._width);
		this._position.y = Math.floor(this._screenPosition.y / this._width);
	}
}

export default Bullet;
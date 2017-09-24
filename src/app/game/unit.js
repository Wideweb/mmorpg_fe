import constants from './constants';
import GameObject from './game-object';

class Unit extends GameObject {

	constructor(sid, screenPosition, width, position) {
		super(sid, screenPosition, width);

		this._path = [];
		this._position = position;

		this._speed = 1;
	}

	update(elapsed) {
		this.needMove() && this.run(elapsed);
	}

	draw(context, selected) {
		context.save();

		context.beginPath();
		context.rect(this._screenPosition.x, this._screenPosition.y, this._width, this._width);
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
		let next = this._path[0];

		this._position.x = next.x;
		this._position.y = next.y;

		let deltaX = next.x * constants.tileWidth - this._screenPosition.x;
		let deltaY = next.y * constants.tileWidth - this._screenPosition.y;

		let distace = Math.abs(deltaX) + Math.abs(deltaY);
		let speed = this._speed * elapsed / 10;

		if (distace > speed) {
			let angle = Math.atan2(deltaY, deltaX);

			deltaX = Math.cos(angle) * speed;
			deltaY = Math.sin(angle) * speed;

		} else {
			this._path = this._path.slice(1);

			/*if (this._path.length == 0) {
				this.updatePath();
			}*/
		}

		this._screenPosition.x += deltaX;
		this._screenPosition.y += deltaY;
	}

	needMove() {
		if (!this._path || this._path.length == 0) {
			return false;
		}

		return true;
	}

	checkHit(screenPosition) {
		return this._screenPosition.x <= screenPosition.x
			&& this._screenPosition.x + this._width >= screenPosition.x
			&& this._screenPosition.y <= screenPosition.y
			&& this._screenPosition.y + this._width >= screenPosition.y;
	}

	takeDamage(damage) {
		console.log('took damage ', damage);
	}

	set path(value) {
		this._path = value;
	}

	get position() {
		return this._position;
	}

	set position(value) {
		this._position.x = value.x;
		this._position.y = value.y;

		this._screenPosition = {
			x: this._position.x * this._width,
			y: this._position.y * this._width,
		};
	}
}

export default Unit;
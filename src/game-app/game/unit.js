import constants from './constants';
import GameObject from './game-object';
import UnitAnimation from './animations/unit-animation';
import container from '../infrastructure/ioc.container';

class Unit extends GameObject {

	constructor(sid, name, screenPosition, width, position, health, maxHealth) {
		super(sid, screenPosition, width);

		this._name = name;
		this._path = [];
		this._position = position;
		this._health = health;
		this._maxHealth = maxHealth;

		this._titleFontSize = 15;
		this._speed = 1;
		this._color = 'red';
		this._moveVector = { x: 0, y: 0 };

		let contentManager = container.resolve('contentManager');
		let image = contentManager.getImage('human');
		this._sprite = new UnitAnimation(this, image);
	}

	update(elapsed) {
		this.needMove() && this.run(elapsed);
		super.update(elapsed);
		this._sprite.update(elapsed);
	}

	draw(context) {
		context.save();

		context.beginPath();
		context.rect(this._screenPosition.x, this._screenPosition.y, this._width, this._width);
		context.fillStyle = this._color;
		context.stroke();

		context.beginPath();
		context.rect(this._screenPosition.x, this._screenPosition.y - 7, this._width, 4);
		context.stroke();

		context.beginPath();
		let p = this._health / this._maxHealth;
		context.rect(this._screenPosition.x, this._screenPosition.y - 6, this._width * p, 2);
		context.fillStyle = 'red';
		context.fill();
		context.stroke();

		if (this._name) {
			context.font = `${this._titleFontSize}px Arial`;
			context.fillStyle = 'red';
			let titlePositionX = this.screenPositionCenter.x - context.measureText(this._name).width / 2;
			let titlePositionY = this.screenPosition.y - 10;
			context.fillText(this._name, titlePositionX, titlePositionY);
		}

		context.restore();
		this._sprite.draw(context);
		super.draw(context);
	}

	run(elapsed) {
		let next = this._path[0];

		this._position.x = next.x;
		this._position.y = next.y;

		let deltaX = next.x * constants.tileWidth - this._screenPosition.x;
		let deltaY = next.y * constants.tileWidth - this._screenPosition.y;

		this._moveVector.x = deltaX == 0 ? 0 : deltaX > 0 ? 1 : -1;
		this._moveVector.y = deltaY == 0 ? 0 : deltaY > 0 ? 1 : -1;

		let distace = Math.abs(deltaX) + Math.abs(deltaY);
		let speed = this._speed * elapsed / 10;

		if (distace > speed) {
			let angle = Math.atan2(deltaY, deltaX);

			deltaX = Math.cos(angle) * speed;
			deltaY = Math.sin(angle) * speed;

		} else {
			this._path = this._path.slice(1);
		}

		this._screenPosition.x += deltaX;
		this._screenPosition.y += deltaY;
	}

	needMove() {
		if (!this._path || this._path.length == 0) {
			this._moveVector.x = 0;
			this._moveVector.y = 0;
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

	takeDamage(damage, health) {
		this._health = health;
		console.log('took damage ', damage);
		console.log('health ', health);
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

		this._screenPosition.x = this._position.x * this._width;
		this._screenPosition.y = this._position.y * this._width;

		this._path = [];
	}

	get screenPositionCenter() {
		return {
			x: this._screenPosition.x + this._width / 2,
			y: this._screenPosition.y + this._width / 2
		};
	}

	get moveVector() {
		return this._moveVector;
	}

	set color(value) {
		this._color = value;
	}
}

export default Unit;
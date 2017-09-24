import GameObject from './game-object';
import registry from './game-object-registry';

class Bullet extends GameObject {

	constructor(sid, screenPosition, width, target) {
		super(sid, screenPosition, width);

		this._target = target;
		this._speed = 5;
		this._isTargetRiched = false;
	}

	update(elapsed) {
		this.run(elapsed);
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
		if (this._isTargetRiched) {
			return;
		}

		let deltaX = this._target.screenPositionCenter.x - this._screenPosition.x;
		let deltaY = this._target.screenPositionCenter.y - this._screenPosition.y;

		let distace = Math.abs(deltaX) + Math.abs(deltaY);
		let speed = this._speed * elapsed / 10;

		if (distace > speed) {
			let angle = Math.atan2(deltaY, deltaX);

			deltaX = Math.cos(angle) * speed;
			deltaY = Math.sin(angle) * speed;
		} else {
			this._isTargetRiched = true;
			registry.remove(this);
		}

		this._screenPosition.x += deltaX;
		this._screenPosition.y += deltaY;
	}
}

export default Bullet;
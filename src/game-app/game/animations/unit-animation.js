import SpriteAnimation from './sprite-animation';

class UnitAnimation {

	set position(value) {
		this._position = value;
	}

	constructor(unit, image) {
		this._unit = unit;
		this._image = image;
		this._frameTime = 100;

		this._moveSprite = new SpriteAnimation(
			image, 9, this._frameTime, { x: 0, y: 6 }, 9, 1, 64, 64, 1);

		this._currentSprite = this._moveSprite;
	}

	update(elapsed) {
		this.updateSprite();

		this._currentSprite.position = this._unit.screenPositionCenter;
		this._currentSprite.update(elapsed);
	}

	updateSprite() {
		let move = this._unit.moveVector;
		if (move.x == 0 && move.y == 0) {
			this._currentSprite.stop();
			this._currentSprite.reset();
			return;
		}

		this._currentSprite.start();

		let left = move.x < 0;
		let right = move.x > 0;
		let up = move.y < 0;
		let down = move.y > 0;

		if (up) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 8 };
		} else if (down) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 10 };
		} else if (right) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 11 };
		} else if (left) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 9 };
		}
	}

	draw(context) {
		this._currentSprite.draw(context);
	}
}

export default UnitAnimation;
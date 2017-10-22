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
			image, 9, this._frameTime, { x: 0, y: 6 }, 9, 1, 64, 64, 1, true);

		this._rangeAttackSprite = new SpriteAnimation(
			image, 13, this._frameTime, { x: 0, y: 16 }, 13, 1, 64, 64, 1, false);

		this._currentSprite = this._moveSprite;
		this._left = false;
		this._right = false;
		this._up = false;
		this._down = true;
	}

	update(elapsed) {
		this.updateSprite();

		this._currentSprite.position = this._unit.screenPositionCenter;
		this._currentSprite.update(elapsed);
	}

	updateSprite() {
		let move = this._unit.moveVector;
		if (move.x == 0 && move.y == 0) {
			if (this._currentSprite == this._moveSprite) {
				this._currentSprite.stop();
				this._currentSprite.reset();
			}
			return;
		}

		this._currentSprite = this._moveSprite;
		this._currentSprite.start();

		this._left = move.x < 0;
		this._right = move.x > 0;
		this._up = move.y < 0;
		this._down = move.y > 0;

		if (this._up) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 8 };
		} else if (this._left) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 9 };
		} else if (this._down) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 10 };
		} else if (this._right) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 11 };
		}
	}

	startCastRageAbilityAnimation(castTime) {
		this._currentSprite.reset();
		this._currentSprite = this._rangeAttackSprite;
		this._currentSprite.animationTime = castTime;
		if (this._up) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 16 };
		} else if (this._left) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 17 };
		} else if (this._down) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 18 };
		} else if (this._right) {
			this._currentSprite.startSpriteGridPoint = { x: 0, y: 19 };
		}
		this._currentSprite.start();
	}

	draw(context) {
		this._currentSprite.draw(context);
	}
}

export default UnitAnimation;
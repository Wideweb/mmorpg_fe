class Camera {

	constructor(width, height) {
		this._width = width;
		this._height = height;
		this._scale = 1;
		this._offsetX = 0;
		this._offsetY = 0;
		this._target = null;
	}

	get scale() {
		return this._scale;
	}

	set scale(value) {
		this._scale = value;
	}

	get offsetX() {
		return this._offsetX;
	}

	set offsetX(value) {
		this._offsetX = value;
	}

	get offsetY() {
		return this._offsetY;
	}

	set offsetY(value) {
		this._offsetY = value;
	}

	set target(value) {
		this._target = value;
	}

	get target() {
		return this._target;
	}

	get width() {
		return this._width;
	}

	get height() {
		return this._height;
	}

	isVisible(x, y, width) {
		if (this._offsetX * -1 > x + width) {
			return false;
		}

		if (this._offsetX * -1 + this._width < x - width) {
			return false;
		}

		if (this._offsetY * -1 > y + width) {
			return false;
		}

		if (this._offsetY * -1 + this._width < y - width) {
			return false;
		}

		return true;
	}
}

export default Camera;
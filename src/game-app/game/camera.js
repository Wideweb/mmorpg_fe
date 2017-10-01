class Camera {

	constructor() {
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
}

export default Camera;
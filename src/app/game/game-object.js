class GameObject {

	get sid() {
		return this._sid;
	}

	get screenPosition() {
		return this._screenPosition;
	}

	set screenPosition(value) {
		this._screenPosition = value;
		this._position.x = Math.floor(this._screenPosition.x / this._width);
		this._position.y = Math.floor(this._screenPosition.y / this._width);
	}

	get screenPositionCenter() {
		return { x: this._screenPosition.x + this._width / 2, y: this._screenPosition.y + this._width / 2 };
	}

	constructor(sid, screenPosition, width) {
		this._sid = sid;
		this._width = width;

		this._screenPosition = screenPosition;
	}
}

export default GameObject;
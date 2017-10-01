import Observable from '../infrastructure/observable';

class GameObject extends Observable {

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
		super();

		this._sid = sid;
		this._width = width;

		this._screenPosition = screenPosition;
		this._isDisposed = false;
	}

	dispose() {
		if (!this._isDisposed) {
			this._isDisposed = true;
			this.notify('Disposed', this);
		}
	}

	onDisposed(callback) {
		this.subscribe('Disposed', callback);
	}
}

export default GameObject;
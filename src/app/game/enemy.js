import Unit from './unit';

class Enemy {

	get id() {
		return this._id;
	}

	constructor(id, gameObject, gameRoomSocket) {
		this._id = id;
		this._gameObject = gameObject;
		this._gameRoomSocket = gameRoomSocket;
	}
}

export default Enemy;
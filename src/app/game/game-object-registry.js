class GameObjectRegistry {

	constructor() {
		this._gameObjects = {};
	}

	add(gameObject) {
		this._gameObjects[gameObject.sid] = gameObject;
	}

	remove(gameObject) {
		delete this._gameObjects[gameObject.sid];
	}

	getById(sid) {
		return this._gameObjects[sid];
	}

	getAll() {
		return Object.values(this._gameObjects);
	}
}

let registry = new GameObjectRegistry();

export default registry;
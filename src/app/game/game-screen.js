import Player from './player';
import Bullet from './bullet';
import CameraController from './camera-controller';
import registry from './game-object-registry';
import factory from './game-object-factory';

class GameScreen {

	constructor(camera, map, gameRoomSocket) {
		this._map = map;
		this._camera = camera;
		this._gameRoomSocket = gameRoomSocket;

		this._gameRoomSocket.joinRoom('testRoom');
		this._gameRoomSocket.onUserData(data => this.onUserData(data));
		this._gameRoomSocket.onUserConnected(data => this.onUserConnected(data));
		this._gameRoomSocket.onUserDisconnected(data => this.onUserDisconnected(data));
		this._gameRoomSocket.onUnitUsedAbility((data) => this.onUnitUsedAbility(data));
		this._gameRoomSocket.onGameObjectStateUpdated((data) => this.onGameObjectStateUpdated(data));
		this._gameRoomSocket.onDamageDealt((data) => this.onDamageDealt(data));

		this._player = null;
		this._gameObjects = [];

		this._cameraController = new CameraController(this._camera);
	}

	onGameObjectStateUpdated(data) {
		let gameObject = registry.getById(data.gameObject.sid);

		if (!gameObject) {
			return;
		}

		let position = data.gameObject.position;
		let target = this._map.getCell(position.x, position.y);
		gameObject.path = [target];
	}

	onUserData(data) {
		for (let gameObjectData of data.gameObjects) {
			registry.add(factory.create(gameObjectData));
		}

		let player = data.player;
		let playerGameObject = registry.getById(player.unit.sid);

		this._player = new Player(
			player.sid,
			this._camera,
			playerGameObject,
			this._gameRoomSocket
		);
	}

	onUserConnected(data) {
		let player = data.player;

		if (this._player && player.sid != this._player.id) {
			let playerGameObject = factory.create(player.unit);
			registry.add(playerGameObject);
		}
	}

	onUserDisconnected(data) {
		registry.remove(data.sid);
	}

	onUnitUsedAbility(data) {
		let origin = registry.getById(data.sid);
		let target = registry.getById(data.targetSid);

		if (!origin || !target) {
			return;
		}

		registry.add(new Bullet(data.bulletSid, origin.screenPositionCenter, 3, target));
	}

	onDamageDealt(data) {
		let target = registry.getById(data.targetSid);

		if (!target) {
			return;
		}

		target.takeDamage(data.damage);
	}

	update(elapsed) {
		for (let gameObject of registry.getAll()) {
			gameObject.update(elapsed);
		}

		this._cameraController.update(elapsed);
	}

	draw(context) {
		this._map.draw(context);

		for (let gameObject of registry.getAll()) {
			gameObject.draw(context);
		}
	}
}

export default GameScreen;
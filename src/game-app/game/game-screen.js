import Player from './player';
import Bullet from './bullet';
import CameraController from './camera-controller';
import registry from './game-object-registry';
import factory from './game-object-factory';
import FadeOutAnimation from './animations/fade-out-animation';
import uuid from 'uuid';

class GameScreen {

	constructor(room, camera, map, gameRoomSocket) {
		this._map = map;
		this._camera = camera;
		this._gameRoomSocket = gameRoomSocket;

		this._gameRoomSocket.joinRoom(room);
		this._gameRoomSocket.onPlayerData(data => this.onPlayerData(data));
		this._gameRoomSocket.onPlayerConnected(data => this.onPlayerConnected(data));
		this._gameRoomSocket.onPlayerDisconnected(data => this.onPlayerDisconnected(data));
		this._gameRoomSocket.onUnitUsedAbility((data) => this.onUnitUsedAbility(data));
		this._gameRoomSocket.onGameObjectStateUpdated((data) => this.onGameObjectStateUpdated(data));
		this._gameRoomSocket.onDamageDealt((data) => this.onDamageDealt(data));

		this._player = null;
		this._gameObjects = [];

		this._cameraController = new CameraController(this._camera, this._map);
	}

	onGameObjectStateUpdated(data) {
		let gameObject = registry.getById(data.gameObject.sid);

		if (!gameObject) {
			return;
		}

		let position = data.gameObject.position;

		if (data.immediately) {
			gameObject.position = position;
		} else {
			let target = this._map.getCell(position.x, position.y);
			gameObject.path = [target];
		}
	}

	onPlayerData(data) {
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

	onPlayerConnected(data) {
		let player = data.player;

		if (this._player && player.sid != this._player.id) {
			let playerGameObject = factory.create(player.unit);
			registry.add(playerGameObject);
		}
	}

	onPlayerDisconnected(data) {
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

		target.takeDamage(data.damage, data.targetHealth);
		var fadeOutAnimation = new FadeOutAnimation(uuid(), data.damage, target.screenPositionCenter);
		registry.add(fadeOutAnimation);
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
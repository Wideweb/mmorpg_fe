import Player from './player';
import Enemy from './enemy';
import Bullet from './bullet';
import CameraController from './camera-controller';

class GameScreen {

	constructor(camera, map, gameRoomSocket) {
		this._map = map;
		this._camera = camera;
		this._gameRoomSocket = gameRoomSocket;

		this._gameRoomSocket.joinRoom('testRoom');
		this._gameRoomSocket.onUserData(data => this.onUserData(data));
		this._gameRoomSocket.onUserConnected(data => this.onUserConnected(data));
		this._gameRoomSocket.onUserDisconnected(data => this.onUserDisconnected(data));
		this._gameRoomSocket.onUnitFired((data) => this.onUnitFired(data));

		this._player = null;
		this._enemies = [];
		this._gameObjects = [];

		this._cameraController = new CameraController(this._camera);
	}

	onUserData(data) {
		let player = data.player;
		let position = player.unit.position;

		this._player = new Player(
			player.sid,
			this._map,
			this._camera,
			position,
			this._gameRoomSocket
		);

		for (let enemy of data.units) {
			this._enemies.push(new Enemy(enemy.sid, this._map, enemy.position, this._gameRoomSocket));
		}
	}

	onUserConnected(data) {
		let player = data.player;
		let position = player.unit.position;

		if (this._player && player.sid != this._player.id) {
			this._enemies.push(new Enemy(player.sid, this._map, position, this._gameRoomSocket));
		}
	}

	onUserDisconnected(data) {
		let enemyIndex = this._enemies.findIndex(it => it.id == data.sid);
		if (enemyIndex >= 0) {
			this._enemies.splice(enemyIndex, 1);
		}
	}

	onUnitFired(data) {
		let origin = this.getUnitBySid(data.sid);
		let target = this.getUnitBySid(data.targetSid);

		if (!origin || !target) {
			return;
		}

		this._gameObjects.push(new Bullet(origin.screenPositionCenter, target));
	}

	getUnitBySid(sid) {
		let unit = null;
		if (sid == this._player.id) {
			unit = this._player.unit;
		} else {
			let enemy = this._enemies.find(e => e.id == sid);
			if (enemy) {
				unit = enemy.unit;
			}
		}

		return unit;
	}

	update(elapsed) {
		this._player && this._player.update(elapsed);
		for (let enemy of this._enemies) {
			enemy.update(elapsed);
		}
		for (let gameObject of this._gameObjects) {
			gameObject.update(elapsed);
		}
		this._cameraController.update(elapsed);
	}

	draw(context) {
		this._map.draw(context);
		for (let enemy of this._enemies) {
			enemy.draw(context);
		}
		for (let gameObject of this._gameObjects) {
			gameObject.draw(context);
		}
		this._player && this._player.draw(context);
	}
}

export default GameScreen;
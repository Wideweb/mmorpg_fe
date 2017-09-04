import map from './map';
import Player from './player';
import Enemy from './enemy';
import CameraController from './camera-controller';
import gameRoomSocket from './game-room-socket';

class GameScreen {

	constructor(camera) {
		this._map = map;
		this._camera = camera;

		gameRoomSocket.onUserData(data => this.onUserData(data));
		gameRoomSocket.onUserConnected(data => this.onUserConnected(data));
		gameRoomSocket.onUserDisconnected(data => this.onUserDisconnected(data));

		this._player = null;
		this._enemies = [];

		this._cameraController = new CameraController(this._camera);
	}

	onUserData(data) {
		this._player = new Player(
			data.id,
			this._map,
			this._camera,
			{ x: data.x, y: data.y }
		);

		for (let i = 0; i < data.enemies.length; i++) {
			let enemyId = data.enemies[i];
			let enemyPosition = { x: data.enemiesX[i], y: data.enemiesY[i] };

			this._enemies.push(new Enemy(enemyId, this._map, enemyPosition));
		}
	}

	onUserConnected(data) {
		let enemyId = data.id;
		if (this._player && enemyId != this._player.Id) {
			this._enemies.push(new Enemy(enemyId, this._map, { x: data.x, y: data.y }));
		}
	}

	onUserDisconnected(data) {
		let enemyIndex = this._enemies.findIndex(it => it.id == data.id);
		if (enemyIndex >= 0) {
			this._enemies.splice(enemyIndex, 1);
		}
	}

	update(elapsed) {
		this._player && this._player.update(elapsed);
		for (let enemy of this._enemies) {
			enemy.update(elapsed);
		}
		this._cameraController.update(elapsed);
	}

	draw(context) {
		this._map.draw(context);
		for (let enemy of this._enemies) {
			enemy.draw(context);
		}
		this._player && this._player.draw(context);
	}
}

export default GameScreen;
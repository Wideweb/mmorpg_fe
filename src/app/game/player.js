import InputManager from './input-manager';
import Unit from './unit';
import constants from './constants';

class Player {

	get id() {
		return this._id;
	}

	get unit() {
		return this._unit;
	}

	constructor(id, map, camera, position, gameRoomSocket) {
		this._id = id;
		this._map = map;
		this._camera = camera;

		this._unit = new Unit(position);
		this._camera.target = this._unit.screenPosition;

		this._gameRoomSocket = gameRoomSocket;

		InputManager.onRightMousedown(args => this.onRightMousedown(args));
		this._gameRoomSocket.onUnitStateUpdated((data) => this.updateUnit(data));
	}

	onRightMousedown(args) {
		const tileWidth = constants.tileWidth;

		let tilePositionX = Math.floor(args.mapPosition.x / tileWidth);
		let tilePositionY = Math.floor(args.mapPosition.y / tileWidth);

		this.sendSetTarget({ x: tilePositionX, y: tilePositionY });
	}

	update(elapsed) {
		this._unit.update(elapsed);
	}

	sendSetTarget(position) {
		this._gameRoomSocket.sendSetTarget({
			sid: this._id,
			position: position
		});
	}

	updateUnit(data) {
		if (data.sid == this._id) {
			let target = this._map.getCell(data.position.x, data.position.y);
			this._unit.path = [target];
		}
	}

	draw(context) {
		this._unit.draw(context);
	}
}

export default Player;
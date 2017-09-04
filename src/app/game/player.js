import InputManager from './input-manager';
import Unit from './unit';
import constants from './constants';
import gameRoomSocket from './game-room-socket';

class Player {

	get id() {
		return this._id;
	}

	constructor(id, map, camera, position) {
		this._id = id;
		this._map = map;
		this._camera = camera;

		this._selectedUnits = [];

		this._unit = new Unit(position, map, 100, false, (cell) => this.sendUnitState(cell));
		this._camera.target = this._unit.screenPosition;

		InputManager.onRightMousedown(args => this.onRightMousedown(args));
	}

	onRightMousedown(args) {
		const tileWidth = constants.tileWidth;

		let tilePositionX = Math.floor(args.mapPosition.x / tileWidth);
		let tilePositionY = Math.floor(args.mapPosition.y / tileWidth);

		this._unit.target = { x: tilePositionX, y: tilePositionY };
	}

	update(elapsed) {
		this._unit.update(elapsed);
	}

	sendUnitState(cell) {
		gameRoomSocket.sendUnitState({
			id: this._id,
			x: cell.x,
			y: cell.y
		});
	}

	draw(context) {
		this._unit.draw(context);
	}
}

export default Player;
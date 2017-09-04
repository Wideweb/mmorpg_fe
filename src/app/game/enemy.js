import Unit from './unit';
import gameRoomSocket from './game-room-socket';

class Enemy {

	get id() {
		return this._id;
	}

	constructor(id, map, position) {
		this._id = id;
		this._map = map;
		this._unit = new Unit(position, map, 100, false);

		gameRoomSocket.onUnitStateUpdated((data) => this.updateUnit(data));
	}

	updateUnit(data) {
		if (data.id == this._id) {
			let target = this._map.getCell(data.x, data.y);
			this._unit.path = [target];
		}
	}

	update(elapsed) {
		this._unit.update(elapsed);
	}

	draw(context) {
		this._unit.draw(context);
	}

}

export default Enemy;
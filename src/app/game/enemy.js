import Unit from './unit';

class Enemy {

	get id() {
		return this._id;
	}

	get unit() {
		return this._unit;
	}

	constructor(id, map, position, gameRoomSocket) {
		this._id = id;
		this._map = map;
		this._unit = new Unit(position);
		this._gameRoomSocket = gameRoomSocket;

		this._gameRoomSocket.onUnitStateUpdated((data) => this.updateUnit(data));
	}

	updateUnit(data) {
		if (data.sid == this._id) {
			let target = this._map.getCell(data.position.x, data.position.y);
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
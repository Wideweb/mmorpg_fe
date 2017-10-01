import InputManager from './input-manager';
import constants from './constants';

class Player {

	get id() {
		return this._id;
	}

	constructor(id, camera, gameObject, gameRoomSocket) {
		this._id = id;
		this._camera = camera;
		this._gameObject = gameObject;
		this._gameRoomSocket = gameRoomSocket;

		this._gameObject.color = 'green';
		this._camera.target = this._gameObject.screenPosition;

		InputManager.onRightMousedown(args => this.onRightMousedown(args));
	}

	onRightMousedown(args) {
		const tileWidth = constants.tileWidth;

		let tilePositionX = Math.floor(args.mapPosition.x / tileWidth);
		let tilePositionY = Math.floor(args.mapPosition.y / tileWidth);

		this.sendSetTarget({ x: tilePositionX, y: tilePositionY });
	}

	sendSetTarget(position) {
		this._gameRoomSocket.sendSetTarget({
			sid: this._gameObject.sid,
			position: position
		});
	}
}

export default Player;
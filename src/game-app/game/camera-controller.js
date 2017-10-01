import InputManager from './input-manager';
import constants from './constants';

class CameraController {

	constructor(camera, map) {
		this._camera = camera;
		this._map = map;

		this._moveCameraRight = false;
		this._moveCameraLeft = false;
		this._moveCameraUp = false;
		this._moveCameraDown = false;

		this._dragCamera = false;

		this._prevMousePosition = null;

		InputManager.onKeyDown(args => this.onKeyDown(args));
		InputManager.onKeyUp(args => this.onKeyUp(args));
		InputManager.onLeftMousedown(args => this.onLeftMousedown(args));
		InputManager.onLeftMouseup(args => this.onLeftMouseup(args));
		InputManager.onMousemove(args => this.onMousemove(args));
	}

	onLeftMousedown(args) {
		this._prevMousePosition = args.screenPosition;
		this._dragCamera = true;
	}

	onLeftMouseup() {
		this._dragCamera = false;
	}

	onMousemove(args) {
		if (!this._dragCamera) {
			return;
		}

		let deltaX = args.screenPosition.x - this._prevMousePosition.x;
		let deltaY = args.screenPosition.y - this._prevMousePosition.y;

		this.moveCamera({ x: deltaX, y: deltaY });

		this._prevMousePosition = args.screenPosition;
	}

	onKeyDown(args) {
		switch (args.keyCode) {
			case 37:
				this._moveCameraLeft = true;
				break;
			case 38:
				this._moveCameraUp = true;
				break;
			case 39:
				this._moveCameraRight = true;
				break;
			case 40:
				this._moveCameraDown = true;
				break;
			default: break;
		}
	}

	onKeyUp(args) {
		switch (args.keyCode) {
			case 37:
				this._moveCameraLeft = false;
				break;
			case 38:
				this._moveCameraUp = false;
				break;
			case 39:
				this._moveCameraRight = false;
				break;
			case 40:
				this._moveCameraDown = false;
				break;
			default: break;
		}
	}

	moveCamera(vector) {
		if (vector.x > 0 && this._camera.offsetX < 0) {
			if (this._camera.offsetX + vector.x > 0) {
				this._camera.offsetX = 0;
			} else {
				this._camera.offsetX += vector.x;
			}
		}

		if (vector.y > 0 && this._camera.offsetY < 0) {
			if (this._camera.offsetY + vector.y > 0) {
				this._camera.offsetY = 0;
			} else {
				this._camera.offsetY += vector.y;
			}
		}

		if (vector.x < 0 && 500 - this._map.width * constants.tileWidth < this._camera.offsetX) {
			if (this._camera.offsetX + vector.x < 500 - this._map.width * constants.tileWidth) {
				this._camera.offsetX = 500 - this._map.width * constants.tileWidth;
			} else {
				this._camera.offsetX += vector.x;
			}
		}

		if (vector.y < 0 && 500 - this._map.height * constants.tileWidth < this._camera.offsetY) {
			if (this._camera.offsetY + vector.y < 500 - this._map.height * constants.tileWidth) {
				this._camera.offsetY = 500 - this._map.height * constants.tileWidth;
			} else {
				this._camera.offsetY += vector.y;
			}
		}
	}

	update(elapsed) {
		if (this._camera.target) {
			let deltaX = this._camera.target.x + this._camera.offsetX - 500 / 2;
			let deltaY = this._camera.target.y + this._camera.offsetY - 500 / 2;

			this.moveCamera({ x: -deltaX, y: -deltaY });
			return;
		}

		if (this._moveCameraLeft) {
			this.moveCamera({ x: constants.cameraSpeed * elapsed, y: 0 });
		}

		if (this._moveCameraUp) {
			this.moveCamera({ x: 0, y: constants.cameraSpeed * elapsed });
		}

		if (this._moveCameraRight) {
			this.moveCamera({ x: constants.cameraSpeed * elapsed * -1, y: 0 });
		}

		if (this._moveCameraDown) {
			this.moveCamera({ x: 0, y: constants.cameraSpeed * elapsed * -1 });
		}
	}
}

export default CameraController;
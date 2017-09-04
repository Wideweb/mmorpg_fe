
import inputEvents from './constants/input-events';

class InputManager {

	constructor() {
		this._observers = [];
		this._canvas = null;
		this._camera = null;
	}

	set camera(value) {
		this._camera = value;
	}

	set canvas(value) {
		this._canvas = value;

		this._canvas.addEventListener('mousedown', e => this.onMousedownProxy(e));
		this._canvas.addEventListener('mouseup', e => this.onMouseupProxy(e));
		this._canvas.addEventListener('mousemove', e => this.onMousemoveProxy(e));
		this._canvas.addEventListener('click', e => this.onClickProxy(e));
		window.addEventListener('keydown', e => this.onKeyDownProxy(e));
		window.addEventListener('keyup', e => this.onKeyUpProxy(e));
	}

	onClickProxy(e) {
		let position = this.getScreenPosition(e);

		switch (e.which) {
			case 1:
				this.notify(inputEvents.leftMouseClick, position);
				break;
			default: break;
		}
	}

	onMouseupProxy(e) {
		let position = this.getScreenPosition(e);

		switch (e.which) {
			case 1:
				this.notify(inputEvents.leftMouseup, position);
				break;
			default: break;
		}
	}

	onMousemoveProxy(e) {
		let position = this.getScreenPosition(e);

		this.notify(inputEvents.mousemove, position);
	}

	onKeyDownProxy(e) {
		this.notify(inputEvents.keydown, e);
	}

	onKeyUpProxy(e) {
		this.notify(inputEvents.keyup, e);
	}

	onMousedownProxy(e) {
		e.preventDefault();

		let position = this.getScreenPosition(e);

		switch (e.which) {
			case 1:
				this.notify(inputEvents.leftMousedown, position);
				break;
			case 3:
				this.notify(inputEvents.rightMousedown, position);
				break;
			default: break;
		}
	}

	onKeyUp(callback) {
		this._observers.push({ event: inputEvents.keyup, callback: callback });
	}

	onKeyDown(callback) {
		this._observers.push({ event: inputEvents.keydown, callback: callback });
	}

	onLeftMouseClick(callback) {
		this._observers.push({ event: inputEvents.leftMouseClick, callback: callback });
	}

	onLeftMousedown(callback) {
		this._observers.push({ event: inputEvents.leftMousedown, callback: callback });
	}

	onLeftMouseup(callback) {
		this._observers.push({ event: inputEvents.leftMouseup, callback: callback });
	}

	onRightMousedown(callback) {
		this._observers.push({ event: inputEvents.rightMousedown, callback: callback });
	}

	onMousemove(callback) {
		this._observers.push({ event: inputEvents.mousemove, callback: callback });
	}

	notify(event, args) {
		for (let observer of this._observers) {
			if (observer.event == event) {
				observer.callback(args);
			}
		}
	}

	getScreenPosition(e) {
		let x;
		let y;

		if (e.pageX || e.pageY) {
			x = e.pageX;
			y = e.pageY;
		}
		else {
			x = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
			y = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
		}

		x -= this._canvas.offsetLeft;
		y -= this._canvas.offsetTop;

		let result = { screenPosition: { x: x, y: y } };

		if (this._camera) {
			let mapX = x * this._camera.scale - this._camera.offsetX;
			let mapY = y * this._camera.scale - this._camera.offsetY;

			result['mapPosition'] = { x: mapX, y: mapY };
		}

		return result;
	}
}

let inputManager = new InputManager();

export default inputManager;
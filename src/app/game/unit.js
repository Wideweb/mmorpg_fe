import { AStartAlgoritm, ClippingAlgorithm } from './pathfinding-algorithm';
import constants from './constants';

class Unit {

	constructor(position, map, health, trackEnemies, onCellChanged) {
		this._path = [];
		this._position = position;
		this._originPosition = { x: position.x, y: position.y };
		this._map = map;
		this._cell = map.getCell(this._position.x, this._position.y);
		this._cell.unit = this;
		this._cellChanged = onCellChanged;

		this._health = health;

		this._trackEnemies = trackEnemies;
		this._target = null;

		this._width = 20;
		this._height = 20;

		this._screenPosition = {
			x: this._position.x * this._width,
			y: this._position.y * this._height,
		};

		this._moving = false;
		this._speed = 1;
		this._radius = 10;
		this._checkPause = 1500;
		this._checkPauseElapsed = 0;

		this._updatePathPause = 500;
		this._updatePathElapsed = 0;
	}

	update(elapsed) {
		this._checkPauseElapsed += elapsed;
		this._updatePathElapsed += elapsed;

		if (this._checkPauseElapsed > this._checkPause) {
			this._checkPauseElapsed = 0;

			this._trackEnemies && this.watch();
		}

		if (this._updatePathElapsed > this._updatePathPause) {
			this._updatePathElapsed = 0;

			if (this._target instanceof Unit) {
				this.updatePath();
			}
		}

		this.needMove() && this.run(elapsed);
	}

	draw(context, selected) {
		context.save();

		context.beginPath();
		context.rect(this._screenPosition.x, this._screenPosition.y, this._width, this._height);
		context.fillStyle = 'red';
		context.fill();

		if (selected) {
			context.strokeStyle = 'green';
			context.lineWidth = 2;
		}
		context.stroke();

		context.restore();
	}

	watch() {
		let walls = [];
		let units = [];

		if (this._target instanceof Unit) {
			let minX = Math.min(this._target.position.x, this._position.x);
			let minY = Math.min(this._target.position.y, this._position.y);
			let maxX = Math.max(this._target.position.x, this._position.x);
			let maxY = Math.max(this._target.position.y, this._position.y);

			for (let x = minX; x <= maxX; x++) {
				for (let y = minY; y <= maxY; y++) {
					let cell = this._map.getCell(x, y);

					if (cell.type == 1) {
						walls.push(cell);
					}
				}
			}

			let visible = walls.every(w => {
				return ClippingAlgorithm.findIntersection(
					this.screenPositionCenter,
					this._target.screenPositionCenter,
					w.polygon
				) == null;
			});

			if (!visible) {
				this.target = null;
			} else {
				return;
			}
		}

		for (let dy = -this._radius; dy <= this._radius; dy++) {
			for (let dx = -this._radius; dx <= this._radius; dx++) {
				let x = this._position.x + dx;
				let y = this._position.y + dy;

				if (y < 0 || y >= this._map.height) {
					continue;
				}

				if (x < 0 || x >= this._map.width) {
					continue;
				}

				let cell = this._map.getCell(x, y);

				if (cell.type == 1) {
					walls.push(cell);
				} else if (cell.unit && cell.unit != this) {
					units.push(cell.unit);
				}
			}
		}

		var t0 = performance.now();

		for (let unit of units) {
			let visible = walls.every(w => {
				return ClippingAlgorithm.findIntersection(
					this.screenPositionCenter,
					unit.screenPositionCenter,
					w.polygon
				) == null;
			});

			if (visible) {
				this._target = unit;
				break;
			}
		}

		var t1 = performance.now();

		console.log(`Call to watch took ${t1 - t0} milliseconds.`);
	}

	run(elapsed) {
		let next = this._path[0];

		next != this._cell && this._cellChanged && this._cellChanged(next);

		this._cell.unit = null;
		next.unit = this;
		this._cell = next;

		this._position.x = next.x;
		this._position.y = next.y;

		let deltaX = next.x * constants.tileWidth - this._screenPosition.x;
		let deltaY = next.y * constants.tileWidth - this._screenPosition.y;

		let distace = Math.abs(deltaX) + Math.abs(deltaY);
		let speed = this._speed * elapsed / 10;

		if (distace > speed) {
			let angle = Math.atan2(deltaY, deltaX);

			deltaX = Math.cos(angle) * speed;
			deltaY = Math.sin(angle) * speed;

		} else {
			this._path = this._path.slice(1);

			/*if (this._path.length == 0) {
				this.updatePath();
			}*/
		}

		this._screenPosition.x += deltaX;
		this._screenPosition.y += deltaY;
	}

	needMove() {
		if (!this._path || this._path.length == 0) {
			return false;
		}

		return true;
	}

	checkHit(screenPosition) {
		return this._screenPosition.x <= screenPosition.x
			&& this._screenPosition.x + this._width >= screenPosition.x
			&& this._screenPosition.y <= screenPosition.y
			&& this._screenPosition.y + this._height >= screenPosition.y;
	}

	updatePath() {
		if (!this._target) {
			this._target = this._originPosition;
		}

		let isUnit = this._target instanceof Unit;

		let targetPosition;
		if (isUnit) {
			targetPosition = this._target.position;
		} else {
			targetPosition = this._target;
		}

		let pathFinder = new AStartAlgoritm(this._map, this._position, targetPosition, p => this._map.getCell(p.x, p.y).type == 1);

		var t0 = performance.now();
		let path = pathFinder.getPath();
		var t1 = performance.now();

		if (isUnit && path) {
			path.pop();
		}
		this._path = path;

		console.log(`Call to getPath took ${t1 - t0} milliseconds.`);
	}

	set target(value) {
		this._target = value;
		this.updatePath();
	}

	set speed(value) {
		this._speed = value;
	}

	get position() {
		return this._position;
	}

	set position(value) {
		this._position.x = value.x;
		this._position.y = value.y;

		this._screenPosition = {
			x: this._position.x * this._width,
			y: this._position.y * this._height,
		};
	}

	get screenPosition() {
		return this._screenPosition;
	}

	set screenPosition(value) {
		this._screenPosition = value;
		this._position.x = Math.floor(this._screenPosition.x / this._width);
		this._position.y = Math.floor(this._screenPosition.y / this._width);
	}

	get screenPositionCenter() {
		return { x: this.screenPosition.x + this._width / 2, y: this.screenPosition.y + this._height / 2 };
	}

	get health() {
		this._health;
	}

	set path(value) {
		this._path = value;
	}
}

export default Unit;
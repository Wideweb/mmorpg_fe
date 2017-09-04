import AStartCell from './a-start-cell';

class BypassWidthAlgorithm {

	get dy() { return [0, 0, 1, -1, 1, -1, 1, -1]; }

	get dx() { return [1, -1, 0, 0, 1, 1, -1, -1]; }

	constructor(map, start, radius, isTargetFunc, ignorePositionFunc) {
		this._open = [];
		this._closed = [];
		this._start = start;
		this._radius = radius;
		this._map = map;
		this._ignorePositionFunc = ignorePositionFunc;
		this._isTargetFunc = isTargetFunc;
		this._targetCell = null;
	}

	getPath() {
		if (!this._radius) {
			return;
		}

		this._open = [];
		this._closed = [];
		this._targetCell = null;

		this._open.push(new AStartCell(this._start));

		while (this._open.length != 0) {
			let cell = this._open.shift();
			this._closed.push(cell);

			this.addAdjacentCells(cell);

			if (this._targetCell) {
				return this.buldPath(this._targetCell);
			}
		}

		return null;
	}

	addAdjacentCells(cell) {
		let position = cell.position;
		for (let i = 0; i < this.dy.length; i++) {
			let y = position.y + this.dy[i];
			let x = position.x + this.dx[i];
			this.addAdjacentCell({ x: x, y: y }, cell);
		}
	}

	addAdjacentCell(position, parent) {
		if (position.y < 0 || position.y >= this._map.height) {
			return;
		}

		if (position.x < 0 || position.x >= this._map.width) {
			return;
		}

		if (this.getDistanceSquare(position, this._start) > this._radius * this._radius) {
			return;
		}

		if (this._ignorePositionFunc(position)) {
			return;
		}

		if (this._closed.findIndex(c => c.position.x == position.x && c.position.y == position.y) != -1) {
			return;
		}

		let cell = new AStartCell(position, parent);

		if (this._isTargetFunc(position)) {
			this._targetCell = cell;
		}

		this._open.push(cell);
		return;
	}

	getDistanceSquare(first, second) {
		let deltaX = Math.abs(first.x - second.x);
		let deltaY = Math.abs(first.y - second.y);

		return deltaX * deltaX + deltaY * deltaY;
	}

	buldPath(cell) {
		let path = [];

		while (cell != null) {
			path.unshift(this._map.getCell(cell.position.x, cell.position.y));
			cell = cell.parent;
		}

		return path;
	}
}

export default BypassWidthAlgorithm;
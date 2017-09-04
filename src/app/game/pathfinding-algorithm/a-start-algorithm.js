import AStartCell from './a-start-cell';

class AStartAlgoritm {

	get dy() { return [0, 0, 1, -1, 1, -1, 1, -1]; }

	get dx() { return [1, -1, 0, 0, 1, 1, -1, -1]; }

	constructor(map, start, target, ignorePositionFunc) {
		this._open = [];
		this._closed = [];
		this._start = start;
		this._target = target;
		this._map = map;
		this._ignorePositionFunc = ignorePositionFunc;
		this._targetCell = null;
	}

	getPath() {
		if (!this._target || this._ignorePositionFunc(this._target)) {
			return;
		}

		this._open = [];
		this._closed = [];
		this._targetCell = null;

		let fromStartScore = 0;
		let toTargetScore = this.getDistance(this._start, this._target);

		this._open.push(new AStartCell(this._start, null, fromStartScore, toTargetScore));

		while (this._open.length != 0) {
			let cell = this.findBestOpenCell();
			this.addAdjacentCells(cell);

			if (this._targetCell) {
				return this.buldPath(this._targetCell);
			}

			let cellIndex = this._open.findIndex(c => c.position.x == cell.position.x && c.position.y == cell.position.y);
			this._open.splice(cellIndex, 1);
			this._closed.push(cell);
		}

		return null;
	}

	findBestOpenCell() {
		let best = this._open[0];
		for (let cell of this._open) {
			if (cell.score < best.score) {
				best = cell;
			}
		}

		return best;
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

		if (this._ignorePositionFunc(position)) {
			return;
		}

		if (this._closed.findIndex(c => c.position.x == position.x && c.position.y == position.y) != -1) {
			return;
		}

		let delta = this.getDistance(parent.position, position);
		let fromStartScore = parent.fromStartScore + delta;
		let toTargetScore = this.getDistance(position, this._target);

		let cell = this._open.find(c => c.position.x == position.x && c.position.y == position.y);

		if (cell) {
			if (fromStartScore < cell.fromStartScore) {
				cell.parent = parent;
			}
			return;
		}

		cell = new AStartCell(position, parent, fromStartScore, toTargetScore);

		if (position.x == this._target.x && position.y == this._target.y) {
			this._targetCell = cell;
		}

		this._open.push(cell);
		return;
	}

	getDistance(first, second) {
		return Math.abs(first.x - second.x) + Math.abs(first.y - second.y);
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

export default AStartAlgoritm;
import constants from './constants';

class Map {

	get height() {
		return this._height;
	}

	get width() {
		return this._width;
	}

	constructor(cells, camera) {
		this._camera = camera;
		this._cells = cells;
		this._height = this._cells.length;
		this._width = this._cells[0].length;
	}

	getCell(x, y) {
		return this._cells[y][x];
	}

	draw(context) {
		const tileWidth = constants.tileWidth;
		
		for (let y = 0; y < this._cells.length; y++) {
			for (let x = 0; x < this._cells[y].length; x++) {

				let positionX = x * tileWidth;
				let positionY = y * tileWidth;

				if (!this._camera.isVisible(positionX, positionY, tileWidth)) {
					continue;
				}

				let cell = this._cells[y][x];

				context.beginPath();
				context.rect(positionX, positionY, tileWidth, tileWidth);
				if (cell.type == 1) {
					context.fillStyle = 'gray';
				}
				if (cell.type == 0) {
					context.fillStyle = 'white';
				}
				if (cell.type == 2) {
					context.fillStyle = 'green';
				}
				context.fill();
				context.stroke();
			}
		}
	}
}

export default Map;
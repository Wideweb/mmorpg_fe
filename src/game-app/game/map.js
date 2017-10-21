import constants from './constants';
import Terrain from './terrain';

class Map {

	get height() {
		return this._height;
	}

	get width() {
		return this._width;
	}

	constructor(cells, camera, image) {
		this._camera = camera;
		this._cells = cells;
		this._height = this._cells.length;
		this._width = this._cells[0].length;
		this._terrains = [];
		this._image = image;

		for (let y = 0; y < this._cells.length; y++) {
			for (let x = 0; x < this._cells[y].length; x++) {
				this._terrains.push(new Terrain(this._cells[y][x].type, x, y, constants.tileWidth, this._image));
			}
		}
	}

	getCell(x, y) {
		return this._cells[y][x];
	}

	draw(context) {
		for (let terrain of this._terrains) {
			let position = terrain.position;
			if (this._camera.isVisible(position.x, position.y, constants.tileWidth)) {
				terrain.draw(context);
			}
		}
	}
}

export default Map;
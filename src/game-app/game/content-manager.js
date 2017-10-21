import terrainsSpriteFile from '../../assets/images/terrains.png';
import warriorSpriteFile from '../../assets/images/warrior.png';
import archerSpriteFile from '../../assets/images/archer.png';

class ContentManager {

	constructor() {
		this._entries = [];

		this.add('terrains', terrainsSpriteFile);
		this.add('warrior', warriorSpriteFile);
		this.add('archer', archerSpriteFile);
	}

	add(name, path) {
		this._entries[name] = { path: path, name: name };
	}

	async load() {
		let promises = [];

		for (let entryName in this._entries) {
			let promise = new Promise((resolve, reject) => {
				let entry = this._entries[entryName];
				
				let image = new Image();
				image.onload = () => resolve();
				image.onerror = (e) => reject(e);
				image.src = entry.path;

				entry.image = image;
			});

			promises.push(promise);
		}

		return Promise.all(promises);
	}

	getImage(name) {
		let entry = this._entries[name];
		if (!entry) {
			return null;
		}

		return entry.image;
	}
}

export default ContentManager;
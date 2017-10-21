import terrainsSpriteFile from '../../assets/images/terrains.png';
import humanSpriteFile from '../../assets/images/human.png';

class ContentManager {

	constructor() {
		this._entries = [];

		this.add('terrains', terrainsSpriteFile);
		this.add('human', humanSpriteFile);
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
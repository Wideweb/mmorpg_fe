import gameObjectTypes from './constants/game-object-types';
import Bullet from './bullet';
import Unit from './unit';

class GameObjectFactory {
	create(gameObjectData) {
		let gameObject = null;

		switch (gameObjectData.type) {
			case gameObjectTypes.Unit:
				gameObject = new Unit(gameObjectData.sid, gameObjectData.name, gameObjectData.screenPosition,
					gameObjectData.width, gameObjectData.position, gameObjectData.health, 
					gameObjectData.maxHealth, gameObjectData.spriteFileName);
				break;
			case gameObjectTypes.Bullet:
				gameObject = new Bullet(gameObjectData.sid, gameObjectData.screenPosition,
					gameObjectData.width, gameObjectData.target);
				break;
			default:
				throw `object type is not supported: ${gameObjectData.type}`;
		}

		return gameObject;
	}
}

let factory = new GameObjectFactory();

export default factory;
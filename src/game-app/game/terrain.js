class Terrain {

	get position() {
		return { x: this.positionX, y: this.positionY };
	}

	constructor(id, mapPositionX, mapPositionY, tileWidth, image) {
		this._id = id;
		this._mapPositionX = mapPositionX;
		this._mapPositionY = mapPositionY;
		this._tileWidth = tileWidth;
		this._spriteTileWidth = 32;
		this._spriteGridWidth = 19;
		this._image = image;

		this._positionX = this._mapPositionX * tileWidth;
		this._positionY = this._mapPositionY * tileWidth;

		let row = Math.floor(this._id / this._spriteGridWidth);
		let column = this._id - row * this._spriteGridWidth;

		this._startClippingY = row * this._spriteTileWidth + row;
		this._startClippingX = column * this._spriteTileWidth + column;
	}

	draw(context) {
		context.drawImage(
			this._image,
			this._startClippingX,
			this._startClippingY,
			this._spriteTileWidth,
			this._spriteTileWidth,
			this._positionX - 1,
			this._positionY - 1,
			this._tileWidth + 2,
			this._tileWidth + 2
		);
	}
}

export default Terrain;
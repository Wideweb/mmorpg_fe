
class SpriteAnimation {

	set position(value) {
		this._position = value;
	}

	set startSpriteGridPoint(value) {
		this._startSpriteGridPoint = value;
	}

	constructor(image, framesNumber, frameTime, startSpriteGridPoint, spriteGridWidth,
		spriteGridHeight, spriteTileWidth, spriteTileHeight, scale) {
		this._image = image;
		this._framesNumber = framesNumber;
		this._frameTime = frameTime;
		this._startSpriteGridPoint = startSpriteGridPoint;
		this._spriteGridWidth = spriteGridWidth;
		this._spriteGridHeight = spriteGridHeight;
		this._spriteTileWidth = spriteTileWidth;
		this._spriteTileHeight = spriteTileHeight;
		this._scale = scale;

		this._frameElapsedTime = 0;
		this._currentFrame = 0;

		this._startClippingY = 0;
		this._startClippingX = 0;

		this._stop = false;
	}

	update(elapsed) {
		if (this._stop) {
			return;
		}

		this._frameElapsedTime += elapsed;
		if (this._frameElapsedTime >= this._frameTime) {
			this.nextFrame();
			this._frameElapsedTime = 0;
		}
	}

	nextFrame() {
		this._currentFrame++;

		if (this._currentFrame >= this._framesNumber) {
			this.reset();
		}
	}

	reset() {
		this._currentFrame = 0;
	}

	stop() {
		this._stop = true;
	}

	start() {
		this._stop = false;
	}

	draw(context, scaleX = 1) {
		context.save();

		let row = Math.floor(this._currentFrame / this._spriteGridWidth);
		let column = this._currentFrame - row * this._spriteGridWidth;

		this._startClippingY = (this._startSpriteGridPoint.y + row) * this._spriteTileHeight + 8;
		this._startClippingX = (this._startSpriteGridPoint.x + column) * this._spriteTileWidth;

		let width = this._spriteTileWidth * this._scale;
		let height = this._spriteTileHeight * this._scale;

		context.translate(this._position.x - width / 2 * scaleX, this._position.y - height / 2);
		context.scale(scaleX, 1);

		context.drawImage(
			this._image,
			this._startClippingX,
			this._startClippingY,
			this._spriteTileWidth,
			this._spriteTileHeight,
			0,
			0,
			width,
			height
		);

		context.restore();
	}
}

export default SpriteAnimation;
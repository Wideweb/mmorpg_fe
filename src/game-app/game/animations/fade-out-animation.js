import GameObject from '../game-object';

class FadeOutAnimation extends GameObject {

	constructor(sid, text, screenPosition) {
		super(sid, screenPosition);

		this._text = text;
		this._screenPosition = screenPosition;
		this._speed = 0.3;
		this._fadeSpeed = 0.03;
		this._alpha = 1;
		this._fontSize = 15;

		this._width = -1 * this._fontSize * this._text.toString().length / 2;
	}

	update(elapsed) {
		this._screenPosition.y -= this._speed * elapsed / 10;

		if (this._alpha > 0) {
			this._alpha -= this._fadeSpeed;
		}

		if (this._alpha < 0) {
			this._alpha = 0;
			this.dispose();
		}
	}

	draw(context) {
		context.save();

		context.font = `${this._fontSize}px Arial`;
		context.globalAlpha = this._alpha;
		context.fillStyle = 'red';
		context.fillText(this._text, this.screenPositionCenter.x, this._screenPosition.y);

		context.restore();
	}
}

export default FadeOutAnimation;
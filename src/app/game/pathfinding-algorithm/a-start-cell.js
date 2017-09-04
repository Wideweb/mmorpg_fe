class AStartCell {
	constructor(position, parent, fromStartScore, toTargetScore) {
		this._position = position;
		this._parent = parent;
		this._fromStartScore = fromStartScore;
		this._toTargetScore = toTargetScore;
	}

	get position() {
		return this._position;
	}

	get parent() {
		return this._parent;
	}

	set parent(value) {
		this._parent = value;
	}

	get score() {
		return this.toTargetScore + this.fromStartScore;
	}

	get toTargetScore() {
		return this._toTargetScore;
	}

	get fromStartScore() {
		return this._fromStartScore;
	}
}

export default AStartCell;
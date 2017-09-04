import utils from './utils.js';

class Genome {

	constructor(length) {
		this._сhromosomes = [];

		if (length) {
			for (let i = 0; i < length; i++) {
				this._сhromosomes.push(utils.randomInteger(0, 1));
			}
		}

		this._fitness = 0;
	}

	set сhromosomes(value) {
		this._сhromosomes = value;
	}

	get сhromosomes() {
		return this._сhromosomes;
	}

	set fitness(value) {
		this._fitness = value;
	}

	get fitness() {
		return this._fitness;
	}
}

export default Genome;
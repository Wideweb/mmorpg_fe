import utils from './utils.js';
import Genome from './genome';

class GeneticAlgorithm {

	get mutateRate() { return 0.001; }

	get crossoverRate() { return 0.7; }

	constructor(population, fitnessFunc) {
		this._population = population;
		this._genomeLength = population[0].сhromosomes.length;
		this._fitnessFunc = fitnessFunc;
		this.totalFitnessScore = 0;
	}

	epoche() {
		this.updateFitness();

		let newPopulation = [];

		while (newPopulation.length < this._population.length) {
			let mum = this.rouletteWheelSelection();
			let dad = this.rouletteWheelSelection();

			let firstBaby = new Genome();
			let secondBaby = new Genome();

			this.crossover(mum, dad, firstBaby, secondBaby);
			this.mutate(firstBaby);
			this.mutate(secondBaby);

			newPopulation.push(firstBaby, secondBaby);
		}

		this._population = newPopulation;
	}

	updateFitness() {
		this.totalFitnessScore = 0;
		for (let genome of this._population) {
			let fitness = this._fitnessFunc(genome);
			this.totalFitnessScore += fitness;
			genome.fitness = fitness;
		}
	}

	tournament() {
		let first = this._population[utils.randomInteger(0, this._population.length - 1)];
		let second = this._population[utils.randomInteger(0, this._population.length - 1)];

		return first.fitness > second.fitness ? first : second;
	}

	rouletteWheelSelection() {
		let slice = Math.random() * this.totalFitnessScore;
		let total = 0;
		let selectedGenome = 0;

		for (let i = 0; i < this._population.length; i++) {
			total += this._population[i].fitness;
			if (total > slice) {
				selectedGenome = i;
				break;
			}
		}

		return this._population[selectedGenome];
	}

	crossover(mum, dad, firstBaby, secondBaby) {
		if (Math.random() > this.crossoverRate || (mum == dad)) {
			firstBaby.сhromosomes = mum.сhromosomes;
			secondBaby.сhromosomes = dad.сhromosomes;
			return;
		}

		let index = utils.randomInteger(0, this._genomeLength);

		for (let i = 0; i < index; i++) {
			firstBaby.сhromosomes.push(mum.сhromosomes[i]);
			secondBaby.сhromosomes.push(dad.сhromosomes[i]);
		}

		for (let i = index; i < this._genomeLength; i++) {
			firstBaby.сhromosomes.push(dad.сhromosomes[i]);
			secondBaby.сhromosomes.push(mum.сhromosomes[i]);
		}
	}

	mutate(genome) {
		for (let i = 0; i < this._genomeLength; i++) {
			if (Math.random() < this.mutateRate) {
				genome.сhromosomes[i] = !genome.сhromosomes[i];
			}
		}
	}

	getBestGenome() {
		this.updateFitness();

		let best = this._population[0];
		for (let i = 1; i < this._population.length; i++) {
			if (best.fitness < this._population[i].fitness) {
				best = this._population[i];
			}
		}

		return best;
	}
}

export default GeneticAlgorithm;
import AStartAlgoritm from './a-start-algorithm.js';

describe('create-client', () => {

	it('should find path in the space without walls', () => {
		const map = [
			[1, 1, 1, 1, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1]
		];

		const start = { x: 1, y: 1 };
		const target = { x: 3, y: 3 };

		let pathFinder = new AStartAlgoritm(map, start, target, p => map[p.y][p.x] == 1);
		let path = pathFinder.getPath();

		expect(path).is.not.null;
		expect(path.length).is.be.equal(3);
		expect(path[0].x).is.be.equal(start.x);
		expect(path[0].y).is.be.equal(start.y);
		expect(path[1].x).is.be.equal(2);
		expect(path[1].y).is.be.equal(2);
		expect(path[2].x).is.be.equal(target.x);
		expect(path[2].y).is.be.equal(target.y);
	});

	it('should find path in the space with walls', () => {
		const map = [
			[1, 1, 1, 1, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 0, 0, 1],
			[1, 1, 1, 1, 1]
		];

		const start = { x: 1, y: 1 };
		const target = { x: 3, y: 3 };

		let pathFinder = new AStartAlgoritm(map, start, target, p => map[p.y][p.x] == 1);
		let path = pathFinder.getPath();

		expect(path).is.not.null;
		expect(path.length).is.be.equal(4);
		expect(path[0].x).is.be.equal(start.x);
		expect(path[0].y).is.be.equal(start.y);
		expect(path[1].x).is.be.equal(1);
		expect(path[1].y).is.be.equal(2);
		expect(path[2].x).is.be.equal(2);
		expect(path[2].y).is.be.equal(3);
		expect(path[3].x).is.be.equal(target.x);
		expect(path[3].y).is.be.equal(target.y);
	});

	it('shouldn\'t find path if target is not reachable', () => {
		const map = [
			[1, 1, 1, 1, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 0, 1, 0, 1],
			[1, 1, 1, 1, 1]
		];

		const start = { x: 1, y: 1 };
		const target = { x: 3, y: 3 };

		let pathFinder = new AStartAlgoritm(map, start, target, p => map[p.y][p.x] == 1);
		let path = pathFinder.getPath();

		expect(path).is.null;
	});

	it('should find path in space with falsely successful ways', () => {
		const map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 0, 0, 0, 0, 1, 0, 1],
			[1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];

		const start = { x: 1, y: 1 };
		const target = { x: 8, y: 1 };

		let pathFinder = new AStartAlgoritm(map, start, target, p => map[p.y][p.x] == 1);
		let path = pathFinder.getPath();
		console.log(path);
		expect(path).is.not.null;
		expect(path.length).is.be.equal(20);
		expect(path[0].x).is.be.equal(start.x);
		expect(path[0].y).is.be.equal(start.y);
		expect(path[19].x).is.be.equal(target.x);
		expect(path[19].y).is.be.equal(target.y);
	});

	it('should find path in 20x20 space with falsely successful ways', () => {
		const map = [
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
			[1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
			[1, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
			[1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
		];

		const start = { x: 1, y: 1 };
		const target = { x: 29, y: 5 };

		let pathFinder = new AStartAlgoritm(map, start, target, p => map[p.y][p.x] == 1);
		let path = pathFinder.getPath();
		console.log(path);
		expect(path).is.not.null;
		expect(path.length).is.be.equal(59);
		expect(path[0].x).is.be.equal(start.x);
		expect(path[0].y).is.be.equal(start.y);
		expect(path[58].x).is.be.equal(target.x);
		expect(path[58].y).is.be.equal(target.y);
	});
});

const EPSILON = 0.000001;

class ClippingAlgorithm {

	findIntersection(p1, p2, polygon) {
		let d = {};
		d.x = p2.x - p1.x;
		d.y = p2.y - p1.y;

		let tLower = 0;
		let tUpper = 1;
		let t;

		for (let i = 0; i < polygon.length; i++) {
			let n = {};
			let w = {};

			n.x = polygon[i].y - polygon[(i + 1) % polygon.length].y;
			n.y = polygon[(i + 1) % polygon.length].x - polygon[i].x;

			w.x = p1.x - polygon[i].x;
			w.y = p1.y - polygon[i].y;

			let dScalar = d.x * n.x + d.y * n.y;
			let wScalar = w.x * n.x + w.y * n.y;

			if (Math.abs(dScalar) < EPSILON) {
				if (wScalar < 0) {
					tLower = 2;
					break;
				}
			}
			else {
				t = -wScalar / dScalar;
				if (dScalar > 0) {
					if (t > 1) {
						tLower = 2;
						break;
					}
					tLower = Math.max(t, tLower);
					continue;
				}
				if (t < 0) {
					tLower = 2;
					break;
				}
				tUpper = Math.min(t, tUpper);
			}
		}
		if (tLower < tUpper) {
			let lowerPoint = {};
			lowerPoint.x = p1.x + (p2.x - p1.x) * tLower;
			lowerPoint.y = p1.y + (p2.y - p1.y) * tLower;

			let upperPoint = {};
			upperPoint.x = p1.x + (p2.x - p1.x) * tUpper;
			upperPoint.y = p1.y + (p2.y - p1.y) * tUpper;

			return [lowerPoint, upperPoint];
		}

		return null;
	}
}

let clippingAlgorithm = new ClippingAlgorithm();

export default clippingAlgorithm;
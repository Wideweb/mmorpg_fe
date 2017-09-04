import 'expose-loader?jQuery!jquery';

import GameScreen from './game/game-screen';
import InputManager from './game/input-manager';
import Camera from './game/camera';

let canvas = document.getElementById('map');
let context = canvas.getContext('2d');

let camera = new Camera();
let screen = new GameScreen(camera);

InputManager.canvas = canvas;
InputManager.camera = camera;

let lastTime = performance.now();

(function update() {
	let currentTime = performance.now();
	let elapsed = currentTime - lastTime;

	screen.update(elapsed);

	context.clearRect(0, 0, 1000, 1000);
	context.setTransform(camera.scale, 0, 0, camera.scale, camera.offsetX, camera.offsetY);
	screen.draw(context);

	lastTime = currentTime;
	setTimeout(update, 30);
})();
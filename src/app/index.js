import 'expose-loader?jQuery!jquery';

import container from './infrastructure/ioc.container';

import HttpService from './services/http.service';
import RoomService from './services/room.service';
import AuthService from './services/auth.service';
import GameRoomSocket from './game/game-room-socket';
import urls from './constants/urls';

import GameScreen from './game/game-screen';
import InputManager from './game/input-manager';
import Camera from './game/camera';
import Map from './game/map';

startUp();

async function startUp() {
	container.register('http').asSingleton(HttpService);
	container.register('urls').asSingleton(urls);
	container.register('roomService').asSingleton(RoomService);
	container.register('authService').asSingleton(AuthService);

	let authService = container.resolve('authService');
	await authService.login('sasha', '123');

	let roomService = container.resolve('roomService');
	await roomService.createRoom('testRoom', 1);
	await roomService.joinRoom('testRoom');
	let roomMap = await roomService.getRoomMap('testRoom');

	let canvas = document.getElementById('map');
	let context = canvas.getContext('2d');

	let camera = new Camera();
	let map = new Map(roomMap.cells);
	let socket = new GameRoomSocket(urls.gameRoomSocket, authService.accessToken);
	await socket.waitForConnection();
	let screen = new GameScreen(camera, map, socket);

	InputManager.canvas = canvas;
	InputManager.camera = camera;

	let lastTime = performance.now();

	(function update() {
		setTimeout(update, 30);

		let currentTime = performance.now();
		let elapsed = currentTime - lastTime;

		screen.update(elapsed);

		context.clearRect(0, 0, 1000, 1000);
		context.setTransform(camera.scale, 0, 0, camera.scale, camera.offsetX, camera.offsetY);
		screen.draw(context);

		lastTime = currentTime;
	})();
}
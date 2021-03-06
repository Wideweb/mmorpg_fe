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
import ContentManager from './game/content-manager';

async function startUp(accessToken, room) {
	container.register('http').asSingleton(HttpService);
	container.register('urls').asSingleton(urls);
	container.register('roomService').asSingleton(RoomService);
	container.register('authService').asSingleton(AuthService);
	container.register('contentManager').asSingleton(ContentManager);

	let authService = container.resolve('authService');
	//await authService.login('sasha', '123');
	authService.accessToken = accessToken;

	let contentManager = container.resolve('contentManager');
	await contentManager.load();

	let roomService = container.resolve('roomService');
	let roomMap = await roomService.getRoomMap(room);

	let canvas = document.getElementById('map');
	let context = canvas.getContext('2d');

	let camera = new Camera(500, 500);
	let map = new Map(roomMap.cells, camera, contentManager.getImage('terrains'));
	let socket = new GameRoomSocket(urls.gameRoomSocket, authService.accessToken);
	await socket.waitForConnection();
	let screen = new GameScreen(room, camera, map, socket);

	InputManager.canvas = canvas;
	InputManager.camera = camera;

	let stop = false;
	let lastTime = performance.now();

	(function update() {
		if(stop){
			socket.close();
			container.clear();
			return;
		}

		setTimeout(update, 30);

		let currentTime = performance.now();
		let elapsed = currentTime - lastTime;

		screen.update(elapsed);

		context.clearRect(0, 0, 1000, 1000);
		context.setTransform(camera.scale, 0, 0, camera.scale, camera.offsetX, camera.offsetY);
		screen.draw(context);

		lastTime = currentTime;
	})();

	return () => stop = true;
}

export default startUp;
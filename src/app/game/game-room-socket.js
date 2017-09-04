import WebSocket from '../infrastructure/web-socket-client';
import webSocketEvents from './constants/web-socket-events';

class GameRoomSocket extends WebSocket {

	constructor() {
		super('ws://localhost:55603/gr');
	}

	sendUnitState(data) {
		this.send(webSocketEvents.unitState, data);
	}

	onUnitStateUpdated(callback) {
		this.subscribe(webSocketEvents.unitState, callback);
	}

	onUserConnected(callback) {
		this.subscribe(webSocketEvents.userConnected, callback);
	}

	onUserDisconnected(callback) {
		this.subscribe(webSocketEvents.userDisconnected, callback);
	}

	onUserData(callback) {
		this.subscribe(webSocketEvents.userData, callback);
	}
}

let gameRoomSocket = new GameRoomSocket();

export default gameRoomSocket;
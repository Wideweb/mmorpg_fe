import WebSocket from '../infrastructure/web-socket-client';
import webSocketEvents from './constants/web-socket-events';

class GameRoomSocket extends WebSocket {

	constructor(url, accessToken) {
		super(url, accessToken);
	}

	joinRoom(room) {
		this.send(webSocketEvents.joinRoom, { room: room });
	}

	sendUnitState(data) {
		this.send(webSocketEvents.unitState, data);
	}

	sendSetTarget(data) {
		this.send(webSocketEvents.setTarget, data);
	}

	onUnitStateUpdated(callback) {
		this.subscribe(webSocketEvents.unitState, callback);
	}

	onUnitFired(callback) {
		this.subscribe(webSocketEvents.unitFired, callback);
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

export default GameRoomSocket;
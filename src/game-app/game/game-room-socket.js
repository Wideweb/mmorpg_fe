import WebSocket from '../infrastructure/web-socket-client';
import webSocketEvents from './constants/web-socket-events';

class GameRoomSocket extends WebSocket {

	constructor(url, accessToken) {
		super(url, accessToken);
	}

	joinRoom(room) {
		this.send(webSocketEvents.joinRoom, { room: room });
	}

	sendSetTarget(data) {
		this.send(webSocketEvents.setTarget, data);
	}

	sendUseAbility(data) {
		this.subscribe(webSocketEvents.UseAbility, data);
	}

	onGameObjectStateUpdated(callback) {
		this.subscribe(webSocketEvents.gameObjectState, callback);
	}
	
	onUnitUsedAbility(callback) {
		this.subscribe(webSocketEvents.UseAbility, callback);
	}
	
	onDamageDealt(callback) {
		this.subscribe(webSocketEvents.DealDamage, callback);
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
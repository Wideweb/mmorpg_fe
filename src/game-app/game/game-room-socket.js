import WebSocket from '../infrastructure/web-socket-client';
import webSocketEvents from './constants/web-socket-events';

class GameRoomSocket extends WebSocket {

	constructor(url, accessToken) {
		super(url, accessToken);
	}

	joinRoom(room) {
		this.send(webSocketEvents.joinRoom, { group: room });
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

	onUnitCastAbility(callback) {
		this.subscribe(webSocketEvents.CastAbility, callback);
	}
	
	onUnitUsedAbility(callback) {
		this.subscribe(webSocketEvents.UseAbility, callback);
	}
	
	onDamageDealt(callback) {
		this.subscribe(webSocketEvents.DealDamage, callback);
	}

	onPlayerConnected(callback) {
		this.subscribe(webSocketEvents.playerConnected, callback);
	}

	onPlayerDisconnected(callback) {
		this.subscribe(webSocketEvents.disconnected, callback);
	}

	onPlayerData(callback) {
		this.subscribe(webSocketEvents.playerData, callback);
	}
}

export default GameRoomSocket;
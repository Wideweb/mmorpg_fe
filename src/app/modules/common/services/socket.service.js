import WebSocket from '../../../../infrastructure/web-socket-client';

class SocketService {

	constructor(urls, webSocketEvents, $rootScope) {
		this.urls = urls;
		this.webSocketEvents = webSocketEvents;
		this.$rootScope = $rootScope;
		this.socket = null;
	}

	connect(access_tocken) {
		let url = this.urls.identitySocket;
		this.socket = new WebSocket(url, access_tocken);

		this.socket.subscribe(this.webSocketEvents.roomAdded, (data) => this.handleEvent(this.webSocketEvents.roomAdded, data));
		this.socket.subscribe(this.webSocketEvents.roomRemoved, (data) => this.handleEvent(this.webSocketEvents.roomRemoved, data));
		this.socket.subscribe(this.webSocketEvents.connected, (data) => this.handleEvent(this.webSocketEvents.connected, data));
		this.socket.subscribe(this.webSocketEvents.disconnected, (data) => this.handleEvent(this.webSocketEvents.disconnected, data));
		this.socket.subscribe(this.webSocketEvents.playerJoined, (data) => this.handleEvent(this.webSocketEvents.playerJoined, data));
		this.socket.subscribe(this.webSocketEvents.playerLeft, (data) => this.handleEvent(this.webSocketEvents.playerLeft, data));
		this.socket.subscribe(this.webSocketEvents.gameStarted, (data) => this.handleEvent(this.webSocketEvents.gameStarted, data));
		this.socket.subscribe(this.webSocketEvents.characterChosen, (data) => this.handleEvent(this.webSocketEvents.characterChosen, data));

		return this.socket
			.waitForConnection()
			.then(() => this.joinGroup('identity'));
	}

	joinGroup(group) {
		this.socket.send(this.webSocketEvents.joinGroup, { group: group });
	}

	handleEvent(event, data) {
		this.$rootScope.$apply(() => {
			this.$rootScope.$broadcast(event, data);
		});
	}
}

export default SocketService;
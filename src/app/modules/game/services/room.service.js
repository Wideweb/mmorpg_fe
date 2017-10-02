class RoomService {
	constructor(urls, $http) {
		this.urls = urls;
		this.$http = $http;
	}

	getRooms() {
		return this.$http.get(this.urls.rooms);
	}

	getRoom(roomName) {
		return this.$http.get(this.urls.room, {
			params: { roomName: roomName }
		});
	}

	createRoom(roomName, dungeonType) {
		return this.$http.post(this.urls.room, {}, {
			params: { roomName: roomName, dungeonType: dungeonType }
		});
	}

	startGame(roomName) {
		return this.$http.post(this.urls.startGame, {}, {
			params: { roomName: roomName }
		});
	}

	joinRoom(roomName) {
		return this.$http.post(this.urls.joinRoom, {}, {
			params: { roomName: roomName }
		});
	}
	
	leaveRoom(roomName) {
		return this.$http.post(this.urls.leaveRoom, {}, {
			params: { roomName: roomName }
		});
	}
}

export default RoomService;
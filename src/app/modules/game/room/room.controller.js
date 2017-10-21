class RoomController {

	constructor(roomService, $state, $scope, webSocketEvents) {
		this.roomService = roomService;
		this.$state = $state;
		this.$scope = $scope;
		this.webSocketEvents = webSocketEvents;

		this.room = {};
		this.submitting = false;
		this.errorMessage = null;
		this.gameStarted = false;
		this.roomLeft = false;

		if (this.$state.params.roomName) {
			this.fetchRoom();

			this.$scope.$on(webSocketEvents.playerJoined, (e, data) => this.playerJoined(data.player));
			this.$scope.$on(webSocketEvents.playerLeft, (e, data) => this.playerLeft(data.sid));
			this.$scope.$on(webSocketEvents.gameStarted, () => this.onGameStarted());
			this.$scope.$on(webSocketEvents.characterChosen, (e, data) => this.onCharacterChosen(data));
		}
	}

	fetchRoom() {
		this.roomService
			.getRoom(this.$state.params.roomName)
			.then(response => this.onRoomReceived(response.data));
	}

	onRoomReceived(room) {
		this.room = room;
		if (this.room.isStarted) {
			this.gameStarted = true;
			this.$state.go('game-screen', { roomName: this.room.name });
		}
	}

	startGame() {
		if (!this.canStartGame()) {
			return;
		}

		this.submitting = true;

		this.roomService
			.startGame(this.room.name)
			.then(() => this.onGameStarted())
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}

	onGameStarted() {
		this.gameStarted = true;
		this.$state.go('game-screen', { roomName: this.room.name });
	}

	leaveRoom() {
		if (this.roomLeft) {
			return;
		}

		this.submitting = true;

		this.roomService
			.leaveRoom(this.room.name)
			.then(() => {
				this.roomLeft = true;
				this.$state.go('room-list');
			})
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}

	hasPlayers() {
		return this.room && this.room.players && this.room.players.length > 0;
	}

	playerJoined(player) {
		let index = this.room.players.indexOf(p => p.sid == player.sid);
		if (index < 0) {
			this.room.players.push(player);
		}
	}

	playerLeft(playerSid) {
		this.room.players = this.room.players.filter(p => p.sid != playerSid);
	}

	onCharacterChosen(data) {
		let player = this.room.players.find(p => p.sid == data.playerSid);
		if (!player) {
			return;
		}

		player.characterId = data.characterId;
		player.characterName = data.characterName;
	}

	canStartGame() {
		return !this.submitting 
			&& this.room 
			&& this.room.players 
			&& this.room.players.every(p => p.characterId != null);
	}

	$onDestroy() {
		!this.gameStarted && this.leaveRoom();
	}
}

export default RoomController;
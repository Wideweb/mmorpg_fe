class RoomController {

	constructor(roomService, $state) {
		this.roomService = roomService;
		this.$state = $state;

		this.room = {};
		this.submitting = false;
		this.errorMessage = null;
		this.gameStarted = false;
		this.roomLeft = false;

		if (this.$state.params.roomName) {
			this.fetchRoom();
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
		this.submitting = true;

		this.roomService
			.startGame(this.room.name)
			.then(() => {
				this.gameStarted = true;
				this.$state.go('game-screen', { roomName: this.room.name });
			})
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
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

	$onDestroy() {
		!this.gameStarted && this.leaveRoom();
	}
}

export default RoomController;
class RoomController {

	constructor(roomService, $state) {
		this.roomService = roomService;
		this.$state = $state;

		this.room = {};
		this.submitting = false;
		this.errorMessage = null;

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
			this.$state.go('game-screen', { roomName: this.room.name });
		}
	}

	startGame() {
		this.submitting = true;

		this.roomService
			.startGame(this.room.name)
			.then(() => this.$state.go('game-screen', { roomName: this.room.name }))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}

	hasPlayers() {
		return this.room && this.room.players && this.room.players.length > 0;
	}
}

export default RoomController;
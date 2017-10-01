class RoomListController {

	constructor(roomService, $state) {
		this.roomService = roomService;
		this.$state = $state;

		this.rooms = [];
		this.submitting = false;
		this.errorMessage = null;

		this.fetchAllRooms();
	}

	joinRoom(room) {
		this.submitting = true;

		this.roomService
			.joinRoom(room.name)
			.then(() => this.$state.go('room', { roomName: room.name }))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}

	fetchAllRooms() {
		this.roomService
			.getRooms()
			.then(response => {
				this.rooms = response.data;
			})
			.catch(e => this.errorMessage = e.data);
	}
}

export default RoomListController;
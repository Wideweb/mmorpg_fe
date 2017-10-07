class RoomListController {

	constructor(roomService, $state, webSocketEvents, $scope) {
		this.roomService = roomService;
		this.$state = $state;
		this.webSocketEvents = webSocketEvents;
		this.$scope = $scope;

		this.rooms = [];
		this.submitting = false;
		this.errorMessage = null;

		this.fetchAllRooms();

		this.$scope.$on(webSocketEvents.roomAdded, (e, data) => this.roomAdded(data.room));
		this.$scope.$on(webSocketEvents.roomRemoved, (e, data) => this.roomRemoved(data.roomName));
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

	roomAdded(room) {
		this.rooms.push(room);
	}

	roomRemoved(roomName) {
		this.rooms = this.rooms.filter(r => r.name != roomName);
	}
}

export default RoomListController;
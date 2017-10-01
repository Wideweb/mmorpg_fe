class CreateRoomController {

	constructor(roomService, $state) {
		this.roomService = roomService;
		this.$state = $state;
		
		this.submitting = false;
		this.roomName = null;
		this.errorMessage = null;
	}

	createRoom(form) {
		if (form.$invalid) {
			return;
		}

		this.submitting = true;

		this.roomService
			.createRoom(this.roomName, 1)
			.then(() => this.$state.go('room-list'))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}
}

export default CreateRoomController;
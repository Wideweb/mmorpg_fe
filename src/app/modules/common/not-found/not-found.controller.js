class NotFoundController {
	constructor($state) {
		this.$state = $state;
	}

	goHome() {
		this.$state.go('client-list');
	}
}

export default NotFoundController;
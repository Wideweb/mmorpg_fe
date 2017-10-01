class NavigationController{

    constructor($state){
		this.$state = $state;
	}

	goToLogin() {
		this.$state.go('login');
	}

	goToSignUp() {
		this.$state.go('sign-up');
	}

	goToCreateRoom() {
		this.$state.go('create-room');
	}

	goToRoomList() {
		this.$state.go('room-list');
	}
}

export default NavigationController;
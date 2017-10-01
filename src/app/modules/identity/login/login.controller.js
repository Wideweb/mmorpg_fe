class LoginController {

	constructor($state, authService) {
		this.$state = $state;
		this.authService = authService;

		this.submitting = false;
		this.userName = null;
		this.password = null;
		this.errorMessage = null;
	}

	login(form) {
		if (form.$invalid) {
			return;
		}

		this.submitting = true;

		this.authService
			.login(this.userName, this.password)
			.then(() => this.$state.go('room-list'))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}
}

export default LoginController;
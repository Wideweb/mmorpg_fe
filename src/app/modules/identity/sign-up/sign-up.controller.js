class SignUpController {

	constructor($state, authService) {
		this.$state = $state;
		this.authService = authService;

		this.submitting = false;
		this.userName = null;
		this.password = null;
		this.errorMessage = null;
	}

	signUp(form) {
		if (form.$invalid) {
			return;
		}

		this.submitting = true;

		this.authService
			.signUp(this.userName, this.password)
			.then(r => console.log(r))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}
}

export default SignUpController;
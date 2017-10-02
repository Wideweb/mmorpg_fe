export default ngModule => {
	ngModule.run(($rootScope, authService) => {
		$rootScope.$on('$stateChangeStart', (e, toState) => {
			toState.controllerAs = '$ctrl';
			authService.isAuthenticated();
		});
	});
};
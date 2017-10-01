export default ngModule => {
	ngModule.run($rootScope => {
		$rootScope.$on('$stateChangeStart', (e, toState) => {
			toState.controllerAs = '$ctrl';
		});
	});
};
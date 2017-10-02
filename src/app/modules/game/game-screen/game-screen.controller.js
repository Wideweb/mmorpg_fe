import startUp from '../../../../game-app';

class GameScreenController {

	constructor(authService, $scope, $state) {
		this.authService = authService;
		this.$scope = $scope;
		this.$state = $state;

		this.$scope.$on('$destroy', () => this.$onDestroy());

		if (this.$state.params.roomName && this.authService.isAuthenticated()) {
			this.startGame();
		}
	}

	startGame() {
		let authData = this.authService.getAuthData();
		startUp(authData.access_token, this.$state.params.roomName)
			.then(s => this.stopGame = s);
	}

	$onDestroy() {
		this.stopGame && this.stopGame();
	}
}

export default GameScreenController;
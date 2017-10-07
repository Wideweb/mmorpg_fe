const identityApi = 'http://localhost:54404/api';

let urls = {
    signUp: identityApi + '/Account/SignUp',
	login: identityApi + '/token',

	room: identityApi + '/Room',
	rooms: identityApi + '/Room/Rooms',
	joinRoom: identityApi + '/Room/Join',
	leaveRoom: identityApi + '/Room/Leave',
	startGame: identityApi + '/Room/StartGame',
	identitySocket: 'ws://localhost:54404/id'
};

export default urls;
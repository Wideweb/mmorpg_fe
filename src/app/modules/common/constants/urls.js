const gameApi = 'http://localhost:55603/api';
const identityApi = 'http://localhost:54404/api';

let urls = {
    signUp: identityApi + '/Account/SignUp',
	login: identityApi + '/token',

	room: gameApi + '/Room',
	rooms: gameApi + '/Room/Rooms',
	getRoomMap: gameApi + '/Room/Map',
	joinRoom: gameApi + '/Room/Join',
	leaveRoom: gameApi + '/Room/Leave',
	startGame: gameApi + '/Room/StartGame',
};

export default urls;
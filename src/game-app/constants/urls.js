const gameApi = 'http://localhost:55603/api';
const identityApi = 'http://localhost:54404/api';

const urls = {
	login: `${identityApi}/token`,
	room: `${gameApi}/Room`,
	getRoomMap: `${gameApi}/Room/Map`,
	joinRoom: `${gameApi}/Room/Join`,
	startGame: `${gameApi}/Room/StartGame`,
	gameRoomSocket: 'ws://localhost:55603/gr'
};

export default urls;
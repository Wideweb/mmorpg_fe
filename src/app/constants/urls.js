const api = 'http://localhost:55603/api';

const urls = {
	login: `${api}/token`,
	room: `${api}/Room`,
	getRoomMap: `${api}/Room/Map`,
	joinRoom: `${api}/Room/Join`,
	gameRoomSocket: 'ws://localhost:55603/gr'
};

export default urls;
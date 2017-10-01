class RoomService {

	constructor(http, urls) {
		this._http = http;
		this._urls = urls;
	}

	async getRoomMap(roomName) {
		let map = await this._http.get(this._urls.getRoomMap, { roomName: roomName });
		return map;
	}

	async createRoom(roomName, dungeonType) {
		return await this._http.post(this._urls.room, {}, { roomName: roomName, dungeonType: dungeonType });
	}
	
	async startRoom(roomName) {
		return await this._http.post(this._urls.startGame, {}, { roomName: roomName });
	}

	async joinRoom(roomName) {
		return await this._http.post(this._urls.joinRoom, {}, { roomName: roomName });
	}
}

RoomService.$inject = ['http', 'urls'];

export default RoomService;
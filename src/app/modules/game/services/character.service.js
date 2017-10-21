class CharacterService {
	constructor(urls, $http) {
		this.urls = urls;
		this.$http = $http;
	}

	getAll() {
		return this.$http.get(this.urls.character);
	}

	get(id) {
		return this.$http.get(this.urls.character, {
			params: { id: id }
		});
	}

	choose(id, room) {
		return this.$http.get(this.urls.chooseCharacter, {
			params: { id: id, room: room }
		});
	}
}

export default CharacterService;
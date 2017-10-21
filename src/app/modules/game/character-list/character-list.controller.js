class CharacterListController {

	constructor(characterService) {
		this.characterService = characterService;

		this.characters = [];
		this.selectedCharacter = null;
		this.submitting = false;
		this.errorMessage = null;

		this.fetchAllCharacters();
	}

	choose(character) {
		this.submitting = true;

		this.characterService
			.choose(character.id, this.room)
			.then(() => this.characterChoosen(character))
			.catch(e => this.errorMessage = e.data)
			.finally(() => this.submitting = false);
	}

	characterChoosen(character) {
		this.selectedCharacter = character;
	}

	isChosen(character) {
		return this.selectedCharacter && this.selectedCharacter.id == character.id;
	}

	fetchAllCharacters() {
		this.characterService
			.getAll()
			.then(response => {
				this.characters = response.data;
			})
			.catch(e => this.errorMessage = e.data);
	}
}

export default CharacterListController;
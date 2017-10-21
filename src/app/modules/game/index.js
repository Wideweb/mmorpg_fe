import angular from 'angular';
import uiRouter from 'angular-ui-router';

import gameScreenComponent from './game-screen/game-screen.component';
import roomListComponent from './room-list/room-list.component';
import roomComponent from './room/room.component';
import createRoomComponent from './create-room/create-room.component';
import characterListComponent from './character-list/character-list.component';

import roomService from './services/room.service';
import characterService from './services/character.service';

const ngModule = angular
	.module('game', [
		uiRouter
	])

	.component('gameScreen', gameScreenComponent)
	.component('roomList', roomListComponent)
	.component('room', roomComponent)
	.component('createRoom', createRoomComponent)
	.component('characterList', characterListComponent)

	.service('roomService', roomService)
	.service('characterService', characterService)

	.config(($stateProvider) => {
		$stateProvider
			.state('game-screen', {
				url: '/game-screen/:roomName',
				template: '<game-screen></game-screen>',
			})
			.state('room-list', {
				url: '/room-list',
				template: '<room-list></room-list>',
			})
			.state('room', {
				url: '/room/:roomName',
				template: '<room></room>',
			})
			.state('create-room', {
				url: '/create-room',
				template: '<create-room></create-room>',
			})
			.state('character-list', {
				url: '/character-list',
				template: '<character-list></character-list>',
			});
	});

export default ngModule;
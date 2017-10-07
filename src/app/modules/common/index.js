import angular from 'angular';
import uiRouter from 'angular-ui-router';

import navigationComponent from './navigation/navigation.component';
import footerComponent from './footer/footer.component';
import notFoundComponent from './not-found/not-found.component';

import socketService from './services/socket.service';

import urls from './constants/urls';
import webSocketEvents from './constants/web-socket-events';

const ngModule = angular
	.module('common', [
		uiRouter
	])

	.component('navigation', navigationComponent)
	.component('footer', footerComponent)
	.component('notFound', notFoundComponent)

	.service('socketService', socketService)

	.constant('urls', urls)
	.constant('webSocketEvents', webSocketEvents)

	.config(($stateProvider) => {
		$stateProvider
			.state('not-found', {
				url: '/not-found',
				template: '<not-found></not-found>'
			});
	});

export default ngModule;
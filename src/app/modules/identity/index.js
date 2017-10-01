import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';

import loginComponent from './login/login.component';
import signUpComponent from './sign-up/sign-up.component';

import authService from './services/auth.service';

const ngModule = angular
	.module('identity', [
		uiRouter,
		ngCookies
	])

	.component('login', loginComponent)
	.component('signUp', signUpComponent)

	.service('authService', authService)

	.config(($stateProvider) => {
		$stateProvider
			.state('login', {
				url: '/login',
				template: '<login></login>',
			})
			.state('sign-up', {
				url: '/sign-up',
				template: '<sign-up></sign-up>',
			});
	});

export default ngModule;
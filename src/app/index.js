import './index.scss';

import angular from 'angular';
import uiRouter from 'angular-ui-router';
import ngCookies from 'angular-cookies';

import commonModule from './modules/common';
import identityModule from './modules/identity';
import gameModule from './modules/game';

import config from './config';

const ngModule = angular.module('app', [
	uiRouter,
	ngCookies,

	identityModule.name,
	commonModule.name,
	gameModule.name
]);

config(ngModule);

export default ngModule;
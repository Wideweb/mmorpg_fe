import controller from './character-list.controller';
import template from './character-list.html';
import './character-list.scss';

let characterListComponent = {
    restrict: 'E',
    bindings: {
		room: '<'
	},
    template,
    controller
};

export default characterListComponent;
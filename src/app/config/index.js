import routing from './routing';
import http from './http';

export default ngModule => {
    routing(ngModule);
    http(ngModule);
};
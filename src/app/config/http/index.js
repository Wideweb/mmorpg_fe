import HttpExceptionInterceptor from './interceptors/http-exception-interceptor';

export default ngModule => {
    ngModule.config(($provide, $httpProvider) => {

        $provide.service('httpExceptionInterceptor', HttpExceptionInterceptor);
        
        $httpProvider.interceptors.push('httpExceptionInterceptor');

    });
};
/*
The context (this) is lost because the Angular framework only keeps 
references to the handler functions themselves, and invokes them 
directly without any context, as alexpods has pointed out.
 */


class HttpInterceptor {
    constructor() {

        //base class replace the prototype interceptor functions with instance methods.

        ['request', 'requestError', 'response', 'responseError']
            .forEach((method) => {
                if (this[method]) {
                    this[method] = this[method].bind(this);
                }
            });
    }
}

export default HttpInterceptor;
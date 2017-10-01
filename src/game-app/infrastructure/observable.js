
class Observable {

	constructor() {
		this._observers = [];
	}

	subscribe(event, handler) {
		this._observers.push({ event: event, handler: handler });
	}

	notify(event, data) {
		for (let observer of this._observers) {
			if (observer.event === event) {
				observer.handler(data);
			}
		}
	}
}

export default Observable;
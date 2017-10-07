
import Observable from './observable';

class WebSocketClient extends Observable {

	constructor(url, accessToken) {
		super();

		this._accessToken = accessToken;
		this._socket = new WebSocket(url);
		this._socket.onmessage = (e) => this.onmessage(e);

		this._waitPromise = new Promise((resolve) => {
			this._socket.onopen = () => resolve();
		});
	}

	async waitForConnection() {
		return this._waitPromise;
	}

	send(event, data) {
		let message = {
			event: event,
			data: JSON.stringify(data),
			token: this._accessToken
		};

		if (this._socket.readyState == WebSocket.OPEN) {
			this._socket.send(JSON.stringify(message));
		}
		else {
			console.log('Connection is closed');
		}
	}

	onmessage(e) {
		let message = null;
		let messageArgs = null;

		try {
			message = JSON.parse(e.data);
			messageArgs = JSON.parse(message.data);
		} catch (e) {
			console.log('can\'t parse websocket event', e);
			return;
		}

		if (!message) {
			return;
		}

		this.notify(message.event, messageArgs);
	}

	close() {
		if (this._socket) {
			this._socket.close();
		}
	}
}

export default WebSocketClient;
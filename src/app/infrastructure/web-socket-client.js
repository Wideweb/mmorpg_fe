
import Observable from './observable';

class WebSocketClient extends Observable {

	constructor(url) {
		super();

		this._socket = new WebSocket(url);
		this._socket.onmessage = (e) => this.onmessage(e);
	}

	send(event, data) {
		let message = {
			event: event,
			data: JSON.stringify(data)
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
}

export default WebSocketClient;
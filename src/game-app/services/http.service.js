class HttpService {

	constructor() {
		this._defaultHeaders = {};
	}

	addDefaultHeaders(headers) {
		Object.assign(this._defaultHeaders, headers);
	}

	async get(url, params) {
		let query = `${url}${this.formatQueryParams(params)}`;
		return this.makeRequest('GET', query);
	}

	async post(url, data, params) {
		let headers = {
			'Content-type': 'application/x-www-form-urlencoded'
		};
		if (params) {
			url = `${url}${this.formatQueryParams(params)}`;
		}
		return await this.makeRequest('POST', url, data, headers);
	}

	async makeRequest(method, url, data, headers) {
		headers = headers || {};

		return new Promise((resolve, reject) => {
			const xhr = new XMLHttpRequest();

			xhr.open(method, url);

			this.setRequestHeaders(xhr, this._defaultHeaders);
			this.setRequestHeaders(xhr, headers);

			xhr.onload = () => resolve(this.onload(xhr));
			xhr.onerror = () => reject(this.onerror(xhr));

			let body = this.formatBodyParams(data);

			xhr.send(body);
		});
	}

	setRequestHeaders(xhr, headers) {
		for (let headerKey in headers) {
			xhr.setRequestHeader(headerKey, headers[headerKey]);
		}
	}

	formatBodyParams(params) {
		if (!params) {
			return null;
		}

		return Object
			.keys(params)
			.map(key => key + '=' + params[key])
			.join('&');
	}

	formatQueryParams(params) {
		return '?' + Object
			.keys(params)
			.map(key => key + '=' + encodeURIComponent(params[key]))
			.join('&');
	}

	onload(xhr) {
		let data = null;

		try {
			data = JSON.parse(xhr.responseText);
		} catch (e) {
			data = null;
		}

		return data;
	}

	onerror(xhr) {
		return xhr.statusText;
	}
}

export default HttpService;
class AuthService {

	constructor(http, urls) {
		this._http = http;
		this._urls = urls;

		this._accessToken = null;
	}

	get accessToken() {
		return this._accessToken;
	}

	set accessToken(value) {
		this._accessToken = value;
		this._http.addDefaultHeaders({ 'Authorization': `Bearer ${this._accessToken}` });
	}

	async login(username, password) {
		let result = await this._http.post(this._urls.login,
			{
				username: username,
				password: password
			});

		this.accessToken = result.access_token;
	}
}

AuthService.$inject = ['http', 'urls'];

export default AuthService;
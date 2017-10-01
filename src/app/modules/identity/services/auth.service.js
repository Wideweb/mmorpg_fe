const AUTH_DATA_STORAGE_KEY = 'game.identity.authData';

class AuthService {
	constructor(urls, $http, $rootScope, $cookies) {
		this.authData = {};
		this.$http = $http;
		this.urls = urls;
		this.$rootScope = $rootScope;
		this.$cookies = $cookies;

		this.getAuthData();
	}

	signUp(userName, password) {
		return this.$http.post(this.urls.signUp, { userName: userName, password: password });
	}

	login(userName, password) {
		this.removeStoredAuthData();

		var loginModel = {
			userName: userName,
			password: password
		};

		return this
			.$http({
				method: 'POST',
				url: this.urls.login,
				headers: {
					'Content-type': 'application/x-www-form-urlencoded'
				},
				transformRequest: function (requestData) {
					return Object
						.keys(requestData)
						.map(k => encodeURIComponent(k) + '=' + encodeURIComponent(requestData[k]))
						.join('&');
				},
				data: loginModel,
			})
			.then(response => this.storeAuthData(response.data));
	}

	logout() {
		this.removeStoredAuthData();
		this.authData = {};
	}

	isAuthenticated() {
		return !!this.getAuthData();
	}

	storeAuthData(authData) {
		this.removeStoredAuthData();
		this.authData = authData;
		this.setHttpAuthHeader();
		var authDataJson = JSON.stringify(authData);
		this.$cookies.put(AUTH_DATA_STORAGE_KEY, authDataJson);
	}

	getAuthData() {
		var savedAuthData = this.$cookies.get(AUTH_DATA_STORAGE_KEY);
		if (savedAuthData) {
			this.authData = JSON.parse(savedAuthData);
			this.setHttpAuthHeader();
			return this.authData;
		}

		this.authData = {};
		return this.authData;
	}

	removeStoredAuthData() {
		this.$http.defaults.headers.common.Authorization = '';
		this.$cookies.remove(AUTH_DATA_STORAGE_KEY);
	}

	setHttpAuthHeader() {
		var token = this.authData.access_token;
		this.$http.defaults.headers.common.Authorization = 'Bearer ' + token;
	}
}

export default AuthService;
class Utils {

	isObject(value) {
		return value !== null && typeof value === 'object';
	}

	isFunction(value) { 
		return typeof value === 'function'; 
	}

	isArray(value){
		return Array.isArray(value);
	}
}

const utils = new Utils();

export default utils;
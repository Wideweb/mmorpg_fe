import Utils from './utils';

class IOCContainer {

	constructor() {
		this.records = [];
	}

	register(name) {
		var record = {
			name: name,
			as: function (value) {
				this.value = value;
			},
			asSingleton: function (value) {
				this.value = value;
				this.singleton = true;
			}
		};
		this.records.push(record);
		return record;
	}

	resolve(name) {
		var record = this.records.find(record => record.name == name);
		if (!record) {
			return null;
		}

		if (record.singleton && record.instance) {
			return record.instance;
		}

		let instance = this.createInstance(record);

		if (record.singleton) {
			return record.instance = instance;
		}

		return instance;
	}

	createInstance(record) {
		if (Utils.isFunction(record.value)) {
			var deps = record.value.$inject;
			if (Utils.isArray(deps)) {
				var resolvedDeps = deps.map(dep => this.resolve(dep));
				return new record.value(...resolvedDeps);
			}
			return new record.value();
		}

		return record.value;
	}
}

const container = new IOCContainer();

export default container;
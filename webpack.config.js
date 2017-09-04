const devConfig = require('./webpack.dev.config.js');
const testConfig = require('./webpack.test.config.js');

let context = process.env.NODE_ENV || 'development';

let configs = {
	development: devConfig,
	test: testConfig
}

module.exports = configs[context];
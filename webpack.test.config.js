const devConfig = require('./webpack.dev.config.js');


const testConfig = Object.assign({}, devConfig, {
	entry: './index.spec.js',
	target: 'node'
});

module.exports = testConfig;
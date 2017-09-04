var webpackConfig = require('./webpack.config.js');
var path = require('path');

var entry = path.resolve(webpackConfig.context, webpackConfig.entry);
var ci = process.env.NODE_ENV === 'ci';

var preprocessors = {};
preprocessors[entry] = ['webpack', 'sourcemap'];

module.exports = function (config) {
	config.set({

		// base path that will be used to resolve all patterns (eg. files, exclude)
		basePath: '',


		// frameworks to use
		// available frameworks: https://npmjs.org/browse/keyword/karma-adapter
		frameworks: ['mocha', 'chai'],


		// list of files / patterns to load in the browser
		files: [entry],
		webpack: webpackConfig,


		// list of files to exclude
		exclude: [],


		// preprocess matching files before serving them to the browser
		// available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
		preprocessors: preprocessors,

		// test results reporter to use
		// possible values: 'dots', 'progress'
		// available reporters: https://npmjs.org/browse/keyword/karma-reporter
		reporters: ['progress', 'html', 'coverage'],

		coverageReporter: {
			type: 'html'
		},

		htmlReporter: {
			outputDir: 'karma_html', // where to put the reports  
			templatePath: null, // set if you moved jasmine_template.html 
			focusOnFailures: true, // reports show failures on start 
			namedFiles: false, // name files instead of creating sub-directories 
			pageTitle: null, // page title for reports; browser info by default 
			urlFriendlyName: false, // simply replaces spaces with _ for files/dirs 
			reportName: 'report-summary-filename', // report summary filename; browser info by default 


			// experimental 
			preserveDescribeNesting: false, // folded suites stay folded  
			foldAll: false, // reports start folded (only with preserveDescribeNesting) 
		},

		// web server port
		port: 9876,


		// enable / disable colors in the output (reporters and logs)
		colors: true,


		// level of logging
		// possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
		logLevel: config.LOG_INFO,


		// enable / disable watching file and executing tests whenever any file changes
		autoWatch: !ci,


		// start these browsers
		// available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
		browsers: [ci ? 'ChromeCI' : 'Chrome'],


		customLaunchers: {
			ChromeCI: {
				base: 'Chrome',
				flags: ['--no-sandbox']
			}
		},


		// Continuous Integration mode
		// if true, Karma captures browsers, runs the tests and exits
		singleRun: ci,

		// Concurrency level
		// how many browser should be started simultaneous
		concurrency: Infinity,


		plugins: [
			'karma-webpack',
			'karma-chai',
			'karma-mocha',
			'karma-chrome-launcher',
			'karma-coverage',
			'karma-html-reporter',
			'karma-sourcemap-loader'
		]
	});
}
const webpack = require('webpack');
const path = require("path");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');

const devConfig = {
	context: path.resolve(__dirname + '/src/app'),
	entry: {
		app: ['babel-polyfill', './index.js']
	},
	output: {
		path: path.resolve(__dirname + '/dist'),
		publicPath: '/',
		filename: '[name].[chunkhash].js',
		chunkFilename: '[name].[chunkhash].js'
	},
	devtool: 'source-map',
	devServer: {
		contentBase: path.resolve(__dirname + '/dist'),
		inline: true,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000
		},
		proxy: {
			'/v1/**': {
				target: {
					host: "0.0.0.0",
					protocol: 'http:',
					port: 8001,
					changeOrigin: true
				}
			}
		}
	},
	module: {
		rules: [
			{
				enforce: 'pre',
				test: /\.js$/,
				exclude: /(node_modules)/,
				include: /src/,
				loader: 'eslint-loader'
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: /node_modules/,
				query: {
					presets: ['es2015'],
					plugins: ["transform-async-to-generator"]
				}
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('css-loader!sass-loader')
			},
			{
				test: /\.html$/,
				loader: 'raw-loader',
				exclude: /node_modules/
			}
		]
	},
	externals: [
		{
			"window": "window"
		}
	],
	plugins: [
		new WebpackCleanupPlugin(),
		new ExtractTextPlugin('style.[chunkhash].css'),
		new webpack.ProvidePlugin({
			jQuery: 'jquery',
			$: 'jquery',
			jquery: 'jquery'
		}),
		new HTMLWebpackPlugin({
			filename: 'index.html',
			template: 'index.hbs'
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				eslint: {
					configFile: path.join(__dirname, '.eslintrc.json')
				}
			}
		}),
		/*new webpack.optimize.AggressiveMergingPlugin(),
		new webpack.optimize.UglifyJsPlugin({
			compress: { warnings: false },
			sourceMap: true
		}),*/
		/*new webpack.optimize.CommonsChunkPlugin({
			name: 'vendor',
			filename: 'vendor.[chunkhash].js',
			minChunks(module, count) {
				var context = module.context;
				return context && context.indexOf('node_modules') >= 0;
			},
		}),*/
		/*new BundleAnalyzerPlugin({
            analyzerMode: 'static'
        })*/
	],
};


module.exports = devConfig;
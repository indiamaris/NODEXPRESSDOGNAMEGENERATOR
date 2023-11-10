/** @format */

var webpack = require('webpack');
var path = require('path');
var autoprefixer = require('autoprefixer');
var postcssPxtorem = require('postcss-pxtorem');

var config = {
	name: 'feedback-tool',
	entry: {
		'feedback-main': './src/index-main.js',
		'feedback-form': './src/index-form.js',
	},
	output: {
		path: path.resolve(__dirname, 'public/feedback'),
		publicPath: '/feedback/',
		filename: '[name].js',
	},
};
config.module = {
	loaders: [
		{
			test: /\.js$/,
			include: path.resolve(__dirname, 'src'),
			exclude: /(node_modules)/,
			loader: 'babel',
		},
		{
			test: /\.less$/,
			loader: 'style-loader!css-loader!postcss-loader!less-loader',
		},
		{
			test: /\.css$/,
			loader: 'style-loader!css-loader!postcss-loader',
		},
	],
};

config.postcss = function () {
	return [
		autoprefixer({
			browsers: ['last 2 version', 'ie > 8'],
		}),
		postcssPxtorem({
			propWhiteList: [],
		}),
	];
};

config.plugins = [
	new webpack.optimize.UglifyJsPlugin({
		compress: {
			warnings: false,
		},
		output: {
			comments: false,
		},
	}),
	new webpack.DefinePlugin({
		'process.env': {
			NODE_ENV: '"production"',
		},
	}),
];

module.exports = config;

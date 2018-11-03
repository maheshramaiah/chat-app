const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devtool: 'inline-source-map',
	entry: './src/index.js',
	target: 'web',
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	performance: {
		hints: false
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: 'babel-loader'
			},
			{
				test: /(\.scss)$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader'
					},
					{
						loader: 'sass-loader'
					}
				]
			},
			{
				test: /\.(eot|svg|ttf|woff|woff2)$/,
				use: [
					{
						loader: 'file-loader'
					}
				]
			}
		]
	},
	optimization: {
		splitChunks: {
			chunks: 'all',
			name: 'common'
		}
	}
};
/* eslint-disable no-undef */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const browsersync = require('browser-sync-webpack-plugin');

module.exports = merge(common, {
/* 	watch: true, */
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: 'style-loader'
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new browsersync(
			{
				host: 'localhost',
				port: '3000',
				proxy: 'http://localhost:8080/'
			},
			{
				reload: false
			}
		)
	]
}
);
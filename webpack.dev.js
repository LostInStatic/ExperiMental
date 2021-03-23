/* eslint-disable no-undef */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const browsersync = require('browser-sync-webpack-plugin');
const { FALSE } = require('node-sass');

const ifdefOpts = {
	PRODUCTION: false,
	version: 3
};

module.exports = merge(common, {
	/* 	watch: true, */
	mode: 'development',
	devtool: 'inline-source-map',
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: [
					'ts-loader',
					{
						loader: 'ifdef-loader',
						options: ifdefOpts
					}
				],
				exclude: /node_modules/,
			},
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
				proxy: 'http://localhost:9000/'
			},
			{
				reload: false
			}
		)
	]
}
);
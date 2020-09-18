/* eslint-disable no-undef */
const path = require('path');
const DirectoryTreePlugin = require('directory-tree-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');


const inputPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	context: inputPath,
	entry: {
		'main': './main.tsx'
	},
	output: {
		path: outputPath,
		filename: '[name].js'
	},
	devServer: {
		contentBase: outputPath,
		watchContentBase: true,
		disableHostCheck: true,
		port: 9000,
		proxy: {
			'/products': 'http://localhost:8080'
		}
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
			{
				test: /\.md$/,
				use: [
					'json-loader',
					'front-matter-loader'
				],
				exclude: /node_modules/,
			}
		]

	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new DirectoryTreePlugin({
			dir: path.resolve(inputPath, 'experiments'),
			path: path.resolve(inputPath, 'experiments.json'),
			extensions: /\.md/
		}),
		new HtmlWebpackPlugin({
			template:'./index.html'
		})
	]
};

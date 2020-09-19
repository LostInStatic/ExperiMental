/* eslint-disable no-undef */
const merge = require('webpack-merge');
const common = require('./webpack.common.js');

const extractCss = require('mini-css-extract-plugin');
const miniCss = require('optimize-css-assets-webpack-plugin');
const miniJs = require('terser-webpack-plugin');


module.exports = merge(common, {
	mode: 'production',
	optimization: {
		minimizer: [new miniJs({}), new miniCss({})]
	},
	output: {
		filename: '[name].[contenthash].js'
	},
	module: {
		rules: [
			{
				test: /\.(sa|sc|c)ss$/,
				use: [
					{
						loader: extractCss.loader
					},
					'css-loader',
					'sass-loader'
				]
			}
		]
	},
	plugins: [
		new extractCss(
			{
				filename: '[name].[contenthash].css',
				chunkFilename: '[id].[contenthash].css'
			}
		)

	]
}
);

/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { GenerateSW } = require('workbox-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const CopyWebpackPlugin = require('copy-webpack-plugin');


const inputPath = path.resolve(__dirname, 'src');
const outputPath = path.resolve(__dirname, 'dist');

module.exports = {
	context: inputPath,
	entry: {
		'main': './main.tsx'
	},
	output: {
		path: outputPath,
		filename: '[name].js',
	},
	devServer: {
		contentBase: outputPath,
		watchContentBase: true,
		disableHostCheck: true,
		historyApiFallback: true,
		port: 9000,
		proxy: {
			'/experimental-admin/': {
				target: 'https://experimental.vxm.pl',
				secure: false,
				changeOrigin: true
			}
		}
	},
	module: {
		rules: [
			{
				test: /\.md$/,
				use: [
					'json-loader',
					'front-matter-loader'
				],
				exclude: /node_modules/,
			},
			{
				test: /\.(png|jpe?g|gif)$/i,
				use: [
					'file-loader'
				]
			},
			{
				test: /\.svg$/,
				use: [
					{
						loader:'@svgr/webpack',
						options: {
							svgoConfig: {
								plugins: {
									removeViewBox: false
								}
							}
						}
					},
					'file-loader'],
			}
		]

	},
	resolve: {
		extensions: ['.tsx', '.ts', '.js']
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './index.html'
		}),
		new CleanWebpackPlugin(),
		new GenerateSW({
			maximumFileSizeToCacheInBytes: 500000000,
			skipWaiting: true,
			runtimeCaching: [{ handler: 'StaleWhileRevalidate', urlPattern: '.*' }]
		}
		),
		new WebpackPwaManifest({
			name: 'ExperiMental',
			short_name: 'ExperiMental',
			icons: [{
				src: path.resolve(inputPath, 'resources/icon.svg'),
				sizes: [256],
			}]
		}),
		new CopyWebpackPlugin({
			patterns: [
				{
					from: path.resolve(inputPath, '.htaccess'),
					to: path.resolve(outputPath)
				}
			]
		})
	]
};

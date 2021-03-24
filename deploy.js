/* eslint-disable no-undef */
const FtpDeploy = require('ftp-deploy');
const ftpDeploy = new FtpDeploy();
const credentials = require('./FTPCredentials');

console.log(credentials);

const config = {
	user: credentials.user,
	password: credentials.password,
	host: 'ftp.experimental.vxm.pl',
	port: 21,
	localRoot: __dirname + '/dist',
	remoteRoot: '/public_html/dev',
	// include: ["*", "**/*"],      // this would upload everything except dot files
	include: ['*', '**/*'],
	// e.g. exclude sourcemaps, and ALL files in node_modules (including dot files)
	exclude: ['dist/**/*.map', 'node_modules/**', 'node_modules/**/.*', '.git/**'],
	// delete ALL existing files at destination before uploading, if true
	deleteRemote: true,
	// Passive mode is forced (EPSV command is not sent)
	forcePasv: true,
	// use sftp or ftp
	sftp: false
};

ftpDeploy
	.deploy(config)
	.then(res => console.log('finished:', res))
	.catch(err => console.log(err));
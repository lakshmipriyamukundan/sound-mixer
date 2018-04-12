const cmd = require('node-cmd');
const cluster = require('cluster');
//const Promise = require('bluebird');
const winston = require('winston');
const logger = require('./logger');
const { fork } = require('child_process');
var numCPUs = require('os').cpus().length;

//Promisifying the cmd command
// const getAsync = Promise.promisify(cmd.get);

// let mixer = async () => {
// 	// Defined path for mixing video and audio files.
// 	const vPath = './move-it.mp4';
// 	const aPath = './song1.mp3';
// 	const mPath = 'mixed.mp4';

// 	try {
// 		logger.debug('Debug statement');
// 		logger.info('Info statement');

// 		await getAsync(
// 			`ffmpeg -i ${vPath} -i ${aPath} -map 0:v -map 1:a -c copy ${mPath}`
// 		);
// 	} catch (err) {
// 		logger.log(err);
// 	}
// };

let mixer = () => {
	for (i = 0; i <= numCPUs; i++) {
		const childMixer = fork('mix.js');
		childMixer.send('start');
		childMixer.on('message', sum => {
			logger.info('Completed');
		});
	}
};

mixer();

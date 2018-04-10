const cmd = require('node-cmd');
const Promise = require('bluebird');
const winston = require('winston');
const logger = require('./logger');

//Promisifying the cmd command
const getAsync = Promise.promisify(cmd.get);

let mixer = async () => {
	// Defined path for mixing video and audio files.
	const vPath = './move-it.mp4';
	const aPath = './song1.mp3';
	const mPath = 'mixed.mp4';

	try {
		logger.debug('Debug statement');
		logger.info('Info statement');

		await getAsync(
			`ffmpeg -i ${vPath} -i ${aPath} -map 0:v -map 1:a -c copy ${mPath}`
		);
	} catch (err) {
		logger.log(err);
	}
};

mixer();

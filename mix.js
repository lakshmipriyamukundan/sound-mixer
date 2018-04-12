const cmd = require('node-cmd');
const logger = require('./logger');

const vPath = './move-it.mp4';
const aPath = './song1.mp3';
const mPath = 'mixed.mp4';

process.on('message', msg => {
	logger.info('ethi', process.pid);
	cmd.get(
		`ffmpeg -i ${vPath} -i ${aPath} -map 0:v -map 1:a -c copy ${mPath}`
	);
	process.send('hi');
});

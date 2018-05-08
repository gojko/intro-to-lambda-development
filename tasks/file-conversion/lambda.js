const s3Util = require('./s3-util'),
	resize = require('./resize'),
	path = require('path'),
	os = require('os');
exports.main = function (eventObject, context) {
	console.log('received upload event for', JSON.stringify(eventObject));
	return Promise.resolve('OK');
};

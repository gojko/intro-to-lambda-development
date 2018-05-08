const s3Util = require('./s3-util'),
	resize = require('./resize'),
	path = require('path'),
	os = require('os');
exports.main = function (eventObject, context) {
	const eventRecord = eventObject.Records && eventObject.Records[0],
		bucket = eventRecord.s3.bucket.name,
		inputKey = eventRecord.s3.object.key,
		outputKey = inputKey.replace(/upload/, 'thumbnail'),
		extension = path.extname(inputKey),
		id = context.awsRequestId,
		tempPath = path.join(os.tmpdir(),  id + extension),
		resizedPath = path.join(os.tmpdir(), 'resized-' + id + extension);

	console.log('converting', inputKey, 'using', tempPath);
	return s3Util.downloadFileFromS3(bucket, inputKey, tempPath)
		.then(() => resize(tempPath, resizedPath, 100))
		.then(() => s3Util.uploadFileToS3(bucket, outputKey, resizedPath));
};

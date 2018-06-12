const s3Util = require('./s3-util'),
	resize = require('./resize'),
	path = require('path'),
	os = require('os');
exports.main = function (eventObject, context) {
	const eventRecord = eventObject.Records && eventObject.Records[0],
		inputBucket = eventRecord.s3.bucket.name,
		key = eventRecord.s3.object.key,
		extension = path.extname(key),
		id = context.awsRequestId,
		tempPath = path.join(os.tmpdir(),  id + extension),
		resizedPath = path.join(os.tmpdir(), 'resized-' + id + extension),
		outputBucket = process.env.RESULTS_BUCKET_NAME,
		imageSize = parseInt(process.env.IMAGE_SIZE),
		contentType = 'image/' + extension.slice(1);

	console.log('converting', inputBucket, key, 'using', tempPath);
	return s3Util.downloadFileFromS3(inputBucket, key, tempPath)
		.then(() => resize(tempPath, resizedPath, imageSize))
		.then(() => console.log('uploading', resizedPath, 'to', outputBucket, key))
		.then(() => s3Util.uploadFileToS3(outputBucket, key, resizedPath, contentType));
};

const htmlResponse = require('./html-response'),
	AWS = require('aws-sdk'),
	s3 = new AWS.S3();
exports.post = function (event, context) {
	const id = context.awsRequestId,
		stage = event.requestContext.stage,
		thanksText = `
			<html><body>
			<h1>Thanks!</h1>
			Your submission was saved as <a href="/${stage}/submissions/${id}">${id}</a>
			</body></html>
		`;
	return s3.upload({
		Bucket: process.env.BUCKET_NAME,
		Key: id,
		Body: event.body
	}).promise()
	.then(() => htmlResponse(thanksText));
};
exports.get = function (event, context) {
	const id = event.pathParameters.submissionId,
		stage = event.requestContext.stage,
		resultText = `
			<html><body>
			<h1>Loading submission ${id}</h1>
			</body></html>
		`;
	return Promise.resolve(htmlResponse(resultText));
};


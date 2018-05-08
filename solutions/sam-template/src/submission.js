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
	const id = event.pathParameters.submissionId;
	return s3.getObject({
		Bucket: process.env.BUCKET_NAME,
		Key: id
	}).promise()
	.then(result => result.Body.toString('utf-8'))
	.then(body => {
		const resultText = `
				<html><body>
				<h1>Submission ${id}</h1>
				<code>${body}</code>
				</body></html>
			`;
		return htmlResponse(resultText);
	});
};


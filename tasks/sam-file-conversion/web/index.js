'use strict';
const htmlResponse = require('./html-response'),
	AWS = require('aws-sdk'),
	S3 = new AWS.S3();

exports.handler = (event, context) => {
	const params = {
			Bucket: process.env.BUCKET_NAME,
			Fields: {
				key: context.awsRequestId + '.png',
			}
		},
		form = S3.createPresignedPost(params);

	return Promise.resolve(htmlResponse(`
		<html>
		<body>
		<pre><code>${JSON.stringify(form, null, 2)}</code></pre>
		</body></html>
	`));
};

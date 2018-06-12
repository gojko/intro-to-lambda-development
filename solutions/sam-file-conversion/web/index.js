'use strict';
const htmlResponse = require('./html-response'),
	buildHtmlForm = require('./build-form'),
	AWS = require('aws-sdk'),
	S3 = new AWS.S3();

exports.handler = (event, context) => {
	const params = {
			Bucket: process.env.BUCKET_NAME,
			Fields: {
				key: context.awsRequestId + '.png',
				success_action_redirect: `https://${event.headers.Host}/${event.requestContext.stage}/thanks`
			}
		},
		form = S3.createPresignedPost(params),
		responseHtml = buildHtmlForm(form);

	return Promise.resolve(htmlResponse(responseHtml));
};

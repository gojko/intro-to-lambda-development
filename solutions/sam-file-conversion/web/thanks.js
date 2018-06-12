'use strict';
const htmlResponse = require('./html-response'),
	AWS = require('aws-sdk'),
	s3 = new AWS.S3();

exports.handler = (event, context) => {
	const key = event.queryStringParameters.key,
		params = {Bucket: process.env.BUCKET_NAME, Key: key, Expires: 600},
		url = s3.getSignedUrl('getObject', params),
		responseText = `
			<html><body>
			<h1>Thanks</h1>
			<a href="${url}">check your result</a>
			</body></html>
		`;
	return Promise.resolve(htmlResponse(responseText));
};

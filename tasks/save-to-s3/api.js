/*global module, require, console */
'use strict';
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	s3 = new AWS.S3(),
	api = new API(),
	thanksText = `<html><body>
		<h1>Thanks!</h1>
		</body></html>`;

module.exports = api;

api.get('/', function (request) {
	const ts = Date.now();
	return s3.upload({
		Bucket: process.env.BUCKET_NAME,
		Key: `request-${ts}`,
		Body: JSON.stringify(request, null, 2)
	}).promise()
	.then(() => thanksText);
}, {success: {contentType: 'text/html'}});

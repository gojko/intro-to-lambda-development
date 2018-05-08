/*global require, module*/
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	S3 = new AWS.S3(),
	api = new API();

module.exports = api;

api.get('/upload-file', request => {
	'use strict';
	const params = {
		Bucket: process.env.BUCKET_NAME,
		Fields: {
			key: 'upload/' + request.lambdaContext.awsRequestId + '.png'
		}
	};
	return S3.createPresignedPost(params);
});

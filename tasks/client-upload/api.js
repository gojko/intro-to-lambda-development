/*global require, module*/
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	S3 = new AWS.S3(),
	api = new API();

module.exports = api;

api.get('/upload-file', request => {
	'use strict';
	const params = {
		Bucket: request.env.bucketName,
		Fields: {
			key: 'upload/' + request.lambdaContext.awsRequestId
		}
	};
	return S3.createPresignedPost(params);
});

api.addPostDeployConfig('bucketName', 'Upload bucket name', 'configure-bucket');

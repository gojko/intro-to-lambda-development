/*global require, module*/
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	S3 = new AWS.S3(),
	buildHtmlForm = require('./build-form'),
	api = new API();

module.exports = api;

api.get('/upload-file', request => {
	'use strict';
	const params = {
			Bucket: request.env.bucketName,
			Fields: {
				key: 'upload/' + request.lambdaContext.awsRequestId
			}
		},
		form = S3.createPresignedPost(params);
	return buildHtmlForm(form);
}, {success: {contentType: 'text/html'}});

//api.addPostDeployConfig('bucketName', 'Upload bucket name', 'configure-bucket');

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
		},
		form = S3.createPresignedPost(params),
		fields = Object.keys(form.fields).map(field => `<input type="hidden" name="${field}" value="${form.fields[field]}"/>`).join('\n');
	return `
	<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
	  </head>
	  <body>
	  <form action="${form.url}" method="post" enctype="multipart/form-data">
		${fields}
		File:
		<input type="file"   name="file" /> <br />
		<input type="submit" name="submit" value="Upload to Amazon S3" />
	  </form>
	</html>
	`;
}, {success: {contentType: 'text/html'}});

api.addPostDeployConfig('bucketName', 'Upload bucket name', 'configure-bucket');

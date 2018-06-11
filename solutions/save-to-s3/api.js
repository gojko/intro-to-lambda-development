/*global module, require, console */
'use strict';
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	s3 = new AWS.S3(),
	api = new API();

module.exports = api;

api.get('/', function (request) {
	const formText = `<html><body>
		<h1>Register</h1>
		<form method="post" action="/${request.context.stage}/">
			<input placeholder="name" name="name" required/><br/>
			<input type="radio" name="food" value="meat" checked><label>Love meat</label></input><br/>
			<input type="radio" name="food" value="veg"><label>Hate meat</label></input><br/>
			<input type="submit" name="SUBMIT"/>
		</form>
		</body></html>`;

	return formText;
}, {success: {contentType: 'text/html'}});

api.post('/', function (request) {
	const requestId = request.lambdaContext.awsRequestId,
		thanksText = `<html><body>
		<h1>Thanks!</h1>
		<a href="/${request.context.stage}/result/${requestId}">Check result</a>
		</body></html>`
	return s3.upload({
		Bucket: process.env.BUCKET_NAME,
		Key: `upload/${requestId}`,
		Body: JSON.stringify(request.post, null, 2)
	}).promise()
	.then(() => thanksText);
}, {success: {contentType: 'text/html'}});

api.get('/result/{requestId}', function (request) {
	const requestId = request.pathParams.requestId;
	return s3.getObject({
		Bucket: process.env.BUCKET_NAME,
		Key: `result/${requestId}`
	}).promise()
	.then(result => result.Body.toString('utf-8'))
	.then(JSON.parse);
});

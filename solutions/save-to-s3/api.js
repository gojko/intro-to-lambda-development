/*global module, require, console */
'use strict';
const API = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	s3 = new AWS.S3(),
	api = new API(),
	formText = `<html><body>
		<h1>Register</h1>
		<form method="post" action="#">
			<input placeholder="name" name="name" required/><br/>
			<input type="radio" name="food" value="meat" checked><label>Love meat</label></input><br/>
			<input type="radio" name="food" value="veg"><label>Hate meat</label></input><br/>
			<input type="submit" name="SUBMIT"/>
		</form>
		</body></html>`,
	thanksText = `<html><body>
		<h1>Thanks!</h1>
		</body></html>`;

module.exports = api;

api.get('/', function () {
	return formText;
}, {success: {contentType: 'text/html'}});

api.post('/', function (request) {
	return s3.upload({
		Bucket: process.env.BUCKET_NAME,
		Key: request.post.name,
		Body: JSON.stringify(request.post, null, 2)
	}).promise()
	.then(() => thanksText);
}, {success: {contentType: 'text/html'}});

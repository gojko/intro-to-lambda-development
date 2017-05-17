/*global require, module*/
const ApiBuilder = require('claudia-api-builder'),
	AWS = require('aws-sdk'),
	api = new ApiBuilder(),
	dynamoDb = new AWS.DynamoDB.DocumentClient();

module.exports = api;

api.post('/user', function (request) {
	'use strict';
	const params = {
		TableName: request.env.tableName,
		Item: {
			userid: request.body.userId,
			name: request.body.name,
			age: request.body.age
		}
	};
	return dynamoDb.put(params).promise();
}, { success: 201 }); // Return HTTP status 201 - Created when successful

api.get('/user/{id}', function (request) {
	'use strict';
	const params = {
		TableName: request.env.tableName,
		Key: {
			userid: request.pathParams.id
		}
	};

	return dynamoDb.get(params).promise()
		.then(function (response) {
			return response.Item;
		});
});

api.delete('/user/{id}', function (request) {
	'use strict';
	const id = request.pathParams.id,
		params = {
			TableName: request.env.tableName,
			Key: {
				userid: id
			}
		};
	return dynamoDb.delete(params).promise()
		.then(function () {
			return 'Deleted user with id "' + id + '"';
		});
}, {success: { contentType: 'text/plain'}});

//api.addPostDeployConfig('tableName', 'DynamoDB Table Name:', 'configure-db');


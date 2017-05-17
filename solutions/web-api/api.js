/*global module, require, console */
/*eslint strict: ["error", "global"] */
'use strict';
const API = require('claudia-api-builder'),
	api = new API();

module.exports = api;

api.get('/hello', function (/*request*/) {
	return 'hello world';
});

api.get('/another', function (request) {
	if (!request.queryString.name) {
		return 'Hi there anonymous!';
	}
	return 'hello ' + request.queryString.name;
});

api.get('/greet/{role}/{name}', function (request) {
	return 'hello ' + request.pathParams.name + ', you are ' + request.pathParams.role;
});

api.get('/log', function (request) {
	console.log(request);
	return 'OK';
});

api.get('/web-page', function () {
	return '<html><body><h1>From Lambda</h1></body></html>';
}, {success: {contentType: 'text/html'}});

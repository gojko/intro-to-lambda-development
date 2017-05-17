const API = require('claudia-api-builder'),
	api = new API();

module.exports = api;

api.get('/hello', function (request) {
	return 'hello world';
});

api.get('/another', function (request) {
	if (!request.queryString.name) {
		return 'Hi there anonymous!';
	}
	return 'hello ' + request.queryString.name;
});

api.get('/greet/{role}/{name}', function (request) {
	console.log(request);
	return 'hello ' + request.pathParams.name + ', you are ' + request.pathParams.role;
});

const API = require('claudia-api-builder'),
	api = new API();

module.exports = api;

api.get('/hello', function (request) {//eslint-disable-line  no-unused-vars
	return 'hello world';
});

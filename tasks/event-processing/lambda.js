exports.main = function (eventObject, context) { //eslint-disable-line no-unused-vars
	console.log('received upload event for', JSON.stringify(eventObject));
	return Promise.resolve('OK');
};

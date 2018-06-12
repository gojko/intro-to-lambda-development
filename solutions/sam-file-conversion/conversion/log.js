exports.handler = function (eventObject, context) {
	console.log('got', JSON.stringify(eventObject));
	return Promise.resolve('OK');
};

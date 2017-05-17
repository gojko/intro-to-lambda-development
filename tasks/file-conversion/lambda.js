exports.main = function (eventObject, context, callback) {
	console.log(eventObject);
	callback(null, 'OK');
};

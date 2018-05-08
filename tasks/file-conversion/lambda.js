exports.main = function (eventObject, context, callback) {
	console.log(JSON.stringify(eventObject, null, 2));
	callback(null, 'OK');
};

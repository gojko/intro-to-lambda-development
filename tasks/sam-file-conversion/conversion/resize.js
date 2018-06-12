'use strict';
const childProcess = require('child_process'),
	execPromise = function (command) {
		'use strict';
		return new Promise(function (resolve, reject) {
			childProcess.exec(command, function (err) {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	};
module.exports = function resize (inFile, outFile, size) {
	return execPromise(`convert "${inFile}" -resize ${size}x${size} "${outFile}"`);
};

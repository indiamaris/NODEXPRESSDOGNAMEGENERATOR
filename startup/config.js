/** @format */

const config = require('config');
module.exports = function () {
	const privateKey = config.get('jwtPrivateKey');
	if (!privateKey) {
		throw new Error('FATAL ERROR: private key not defined');
		// process.exit(1);
	}
};


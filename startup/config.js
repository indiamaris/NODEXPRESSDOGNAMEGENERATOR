/** @format */

const configi = require('config');
module.exports = function () {
	const privateKey = configi.get('jwtPrivateKey');
	if (!privateKey) {
		throw new Error('FATAL ERROR: private key not defined');
		// process.exit(1);
	}
};


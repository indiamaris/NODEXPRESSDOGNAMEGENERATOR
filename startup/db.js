/** @format */

const moongose = require('mongoose');
module.exports = function () {
	async function main() {
		await moongose
			.connect('mongodb://localhost/DogsNames ')
			.then(() => winston.info(`Conected to MongoDB`));
	}
	main().catch((err) => {
		console.error(winston)(`Not conected to MongoDB`);
	});
};


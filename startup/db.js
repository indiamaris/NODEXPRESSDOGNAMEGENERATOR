/** @format */

const moongose = require('mongoose');
module.exports = function () {
	async function main() {
		await moongose
			.connect('mongodb://localhost/DogsNames ')
			.then(() => console.log('conectedissimo'));
	}
	main().catch((err) => {
		console.error('Not conected', err);
	})
}

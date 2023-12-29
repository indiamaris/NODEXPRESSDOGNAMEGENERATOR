/** @format */
// const winston = require('winston');
const moongose = require('mongoose');
const config = require('config')
module.exports = function () {
	const db = config.get('db')
	async function main() {
		await moongose
			.connect(db)
			.then(() => console.info(`Conected to ${db}`));
	}
	main().catch((err) => {
		console.error(console)(`Not conected to MongoDB`);
	});
};


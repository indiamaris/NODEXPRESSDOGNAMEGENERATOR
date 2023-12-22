/** @format */
const winston = require('winston');
module.exports = function (err, req, res, next) {
	console.log(err.message)
	winston.error(err.message, err);

	res.status(500).send(
		'Provavelmente, pela milésima vez tu nao conectou o DB, hj eh segunda feira ? Tenta ai brew services start mongodb-community@7.0 ?'
	);
};


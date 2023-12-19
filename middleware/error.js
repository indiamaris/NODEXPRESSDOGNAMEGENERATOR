/** @format */

module.exports = function (err, req, res, next) {
	res.status(500).send(
		'Provavelmente, pela milésima vez tu nao conectou o DB, hj eh segunda feira ? Tenta ai "brew services start mongodb-community@7.0" ?'
	);
};

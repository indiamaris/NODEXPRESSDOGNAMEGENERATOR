/** @format */

const winston = require('winston');
require('express-async-errors');
module.exports = function () {
	winston.handleExceptions(
		new winston.transports.File(
			{ filename: 'uncaughtExceptions.log' },
			process.on('unhandledRejection', (ex) => {
				throw ex;
			});
	winston.addColors(winston.transports.File, { filename: 'myLogFile.log' });
	winston.add(winston.transports.MongoDB, {
		db: 'mongodb://localhost/DogsNames', level: 'info'
		

		
});
};

/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
require('express-async-errors');
const express = require('express');
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
require('./startup/config')();
require('./startup/routes')(app);
require('./startup/db')();

//wintons tretas
const winston = require('winston');
winston.add(winston.transports.File, { filename: 'myLogs.log' });

app.listen(PORT, () => {
	winston.info(`Listen on port ${PORT}`);
});


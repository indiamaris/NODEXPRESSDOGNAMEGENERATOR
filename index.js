/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
require('express-async-errors');
const express = require('express');
const config = require('config');
const privateKey = config.get('jwtPrivateKey');
if (!privateKey) {
	console.error('FATAL ERRORI');
	process.exit(1);
}
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
require('./startup/routes')(app);
require('./startup/db')();

//wintons tretas
const winston = require('winston');
winston.add(winston.transports.File, { filename: 'myVeryLogs' });
app.listen(PORT, () =>
	console.log(`Listen to your heart 
When he's calling for you`)
);


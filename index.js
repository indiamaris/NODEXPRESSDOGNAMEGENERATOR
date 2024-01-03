/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
require('express-async-errors');
// const winston = require('winston');
const express = require('express');
const app = express();
const prod = require('./startup/prod');
// const logging = require('./startup/logging');
const config = require('./startup/config');
const startUpRoutes = require('./startup/routes');
const startUpDB = require('./startup/db');
app.use(express.json());
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});
// logging();
config();
startUpRoutes(app);
startUpDB();
prod(app);
const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
	console.log(`Listen on port ${PORT}`);
});
module.exports = server;


/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format
 */
require('express-async-errors');
const setHeaders = require('./middleware/setHeaders');
const express = require('express');
const app = express();
const prod = require('./startup/prod');
const config = require('./startup/config');
const startUpRoutes = require('./startup/routes');
const startUpDB = require('./startup/db');
// const server = require('./startup/server')
app.use(express.json());
// logging(); insert logging
config();
setHeaders(app);
startUpRoutes(app);
startUpDB();
prod(app);

let PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV == 'test') {
  PORT = 0;
}

const server = app.listen(PORT, () => {
  console.log(`Listen on port ${PORT} please insert a real log in future`);
});

module.exports = server;


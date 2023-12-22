/** @format */
const dogNames = require('../routes.js/dogNames');
const base = require('../routes.js/root');
const users = require('../routes.js/users');
const auth = require('../routes.js/auth');
const express = require('express');
// const error = require('.auth./middleware/error');
const error = require('../middleware/auth');
module.exports = function (app) {
	app.use('/', base);

	app.use('/api', dogNames);

	app.use('/api/users', users);

	app.use('/api/auth', auth);

	app.use(error);
};



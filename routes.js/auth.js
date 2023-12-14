/** @format */
const Joi = require('joi');
const { User } = require('../models/user');
const express = require('express');
const router = express.Router();
// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// __________________________________________________
router.post('/', async (req, res) => {
	// console.debug(req.body);
	try {
		const { error } = validateUserAuth(req.body);
		if (error) {
			return res.status(400).send(error.message);
		}

		let userCredentials = await User.findOne({
			userName: req.body.userName,
		});

		if (!userCredentials) {
			return res.status(400).send('Invalid email or password usarname');
		}

		const validCredentials = await bcrypt.compare(
			req.body.password,
			userCredentials.password
		);
		if (!validCredentials) {
			return res.status(400).send('Invalid email or password bicripit');
		}

		const token = user.generateAuthToken();
		res.send(token);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Error');
	}
});

const validateUserAuth = (user) => {
	const schemaUser = Joi.object({
		userName: Joi.string()
			.pattern(/^[a-zA-Z]+$/)
			.min(10)
			.max(250)
			.required()
			.messages({
				'string.required': 'We need a username for a user .',
				'string.pattern.base':
					'Sorry,we require only English alphabet  for a username.',
				'string.min':
					'Sorry, we require a minimum ten character  for a username.',
				'string.max':
					'Sorry, we require a maximum 25 character for a username.',
			}),
		password: Joi.string().min(8).max(1024).required().messages({
			'string.required': 'We need a password for a password .',

			'string.min':
				'Sorry, we require a minimum 8 character  for password.',
			'string.max':
				'Sorry, we require a maximum 1025 character for a password.',
		}),
	});
	return schemaUser.validate(user);
};

module.exports = router;


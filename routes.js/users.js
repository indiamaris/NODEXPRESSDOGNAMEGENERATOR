/** @format */
const { User, validateUser } = require('../models/user');
const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
router.post('/', async (req, res) => {
	console.debug(req.body);
	try {
		console.debug(req.body);
		const { error } = validateUser(req.body);
		if (error) {
			return res.status(400).send(error.message);
		}
		let testUserEmail = await User.findOne({ email: req.body.email });
		if (testUserEmail) {
			return res.status(400).send('Email already registered');
		}
		let testUserName = await User.findOne({ userName: req.body.userName });
		if (testUserName) {
			return res.status(400).send('User already registered');
		}

		const user = new User({
			userName: req.body.userName,
			email: req.body.email,
			password: req.body.password,
		});
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(user.password, salt);

		await user.save();

		res.send(
			`Congrats! The username '${req.body.userName}' associated to the email '${req.body.email}' was created sucessfully`
		);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Error');
	}
});

module.exports = router;


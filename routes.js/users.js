/** @format */
const { User, validateUser } = require('../models/user');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

router.get('/me', auth, async (req, res) => {
	const user = await User.findById(req.body.id).select(-password);
	console.log(user)
	res.send(user);
});

router.post('/', async (req, res) => {
	try {
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
		const token = User.generateAuthToken;

		res.header('x-auth-token', token).send(user._id);
	} catch (error) {
		res.status(500).send('Internal Error');
	}
});

module.exports = router;



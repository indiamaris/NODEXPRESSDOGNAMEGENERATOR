/** @format */
const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
	userName: {
		type: String,
		required: true,
		minlenght: [10, `Must be at least 10 letters`],
		maxlength: [250, `Must be at maximum 55`],
		trim: true,
		unique: true,
	},
	email: {
		type: String,
		required: true,
		minlenght: [2, `Must be at least 2`],
		maxlength: [250, `Must be at maximum 250`],
		trim: true,
		unique: true,
	},

	password: {
		type: String,
		required: true,
		minlenght: [8, `Must be at least 8`],
		maxlength: [1034, `Must be at maximum 25`],
	},
	isAdmin: { type: Boolean },
});

userSchema.methods.generateAuthToken = function () {
	return jwt.sign(
		{ _id: this._id, isAdmin: this.isAdmin },
		config.get('jwtPrivateKey')
	);
};

const User = mongoose.model('User', userSchema);

const validateUser = (user) => {
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
		email: Joi.string()
			// .pattern(/^[a-zA-Z]+$/)
			.min(2)
			.max(250)
			.email()
			.required()
			.messages({
				'string.required': 'We need a email for a email .',
				'string.email': 'We need a valid email .',
				'string.min':
					'Sorry, we require a minimum two character  for a email.',
				'string.max':
					'Sorry, we require a maximum 25 character for a email.',
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
exports.User = User;

exports.validateUser = validateUser;


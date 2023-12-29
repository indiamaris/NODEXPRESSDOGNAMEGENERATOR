/** @format */
const mongoose = require('mongoose');
const Joi = require('joi');

const validateId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
};

const validateIdFormat = (id) => {
	const schemaDogID = Joi.object({
		id: Joi.string().min(24).max(24).required().hex(),
	});
	return schemaDogID.validate(id);
};

exports.validateId = validateId;
exports.validateIdFormat = validateIdFormat;


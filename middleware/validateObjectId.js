/** @format */

const mongoose = require('mongoose');
const Joi = require('joi');

module.exports = (req, res, next) => {
	const schemaDogID = Joi.object({
		id: Joi.string().min(24).max(24).required().hex(),
	});
	return schemaDogID.validate(id);
	next();
};
  
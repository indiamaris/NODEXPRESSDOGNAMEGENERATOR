/** @format */
const Joi = require('joi');
const mongoose = require('mongoose');
const dogNameSchema = new mongoose.Schema({
	dogName: {
		type: String,
		required: true,
		minlenght: [2, `Must be at least 2`],
		maxlength: [25, `Must be at maximum 25`],
		trim: true,
	},
});
const DogName = mongoose.model('dogs-names', dogNameSchema);
const validateDogName = (dogName) => {
	const schemaDogName = Joi.object({
		dogName: Joi.string()
			.pattern(/^[a-zA-Z]+$/)
			.min(2)
			.max(25)
			.required()
			.messages({
				'string.required': 'We need a name for a dog name .',
				'string.pattern.base':
					'Sorry,we require only English alphabet  for a name.',
				'string.min':
					'Sorry, we require a minimum two character  for a name.',
				'string.max':
					'Sorry, we require a maximum 25 character for a name.',
			}),
	});
	return schemaDogName.validate(dogName);
};

const validateIdFormat = (id) => {
	const schemaDogID = Joi.object({
		id: Joi.string().min(24).max(24).required().hex(),
	});
	return schemaDogID.validate(id);
};

const validateId = (id) => {
	return mongoose.Types.ObjectId.isValid(id);
};

const names = () => DogName.find().sort('dogName');

const findByName = (dogName) => DogName.find({ dogName: dogName });
const namesById = (id) => DogName.findById(id);

const nameById = (id) => {
	return namesById(id).select({ _id: false, dogName: true });
};

exports.DogName = DogName;
exports.validateDogName = validateDogName;
exports.validateId = validateId;
exports.names = names;
exports.findByName = findByName;
exports.namesById = namesById;
exports.nameById = nameById;
exports.validateIdFormat = validateIdFormat;


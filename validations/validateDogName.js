/** @format */
const Joi = require('joi');
module.exports = validateDogName = (dogName) => {
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


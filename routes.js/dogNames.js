/** @format */

const Joi = require('joi');

const { getArraySize } = require('../utils-gets-functions/getArraySize');
const express = require('express');
const router = express.Router();
router.use(express.json());
const {
	getRandomItemInArray,
} = require('../utils-gets-functions/getRandomItemInArray');
const {
	getItemInArrayById,
} = require('../utils-gets-functions/getItemInArrayById');
const moongose = require('mongoose');
const { after } = require('node:test');

const dogNameSchema = new moongose.Schema({
	dogName: {
		type: String,
		required: true,
		minlenght: [2, `Must be at least 2`],
		maxlength: [10, `Must be at maximum 10`],
		trim: true,
	},
});

const validateDogName = (dogName) => {
	const schemaDogName = Joi.object({
		dogName: Joi.string()
			.pattern(/^[a-zA-Z]+$/)
			.min(3)
			.max(15)
			.required()
			.messages({
				'string.required': 'We need a name for a dog name .',
				'string.pattern.base':
					'Sorry,we require only English alphabet  for a name.',
				'string.min':
					'Sorry, we require a minimum 3 character  for a name.',
				'string.max':
					'Sorry, we require a maximum 15 character for a name.',
			}),
	});
	return schemaDogName.validate(dogName);
};

const validateId = (id) => {
	const schemaDogID = Joi.object({
		id: Joi.string().min(24).max(25).required(),
		// .messages({
		// 	'string.required': 'We need a id here .',
		// 	'string.hex':
		// 		'Sorry, we require a hexadecimal for a id.',
		// 	'string.min':
		// 		'Sorry, we require a minimum 24 character  for a id.',
		// 	'string.max':
		// 		'Sorry, we require a maximum 25 character for a id.',
		// }),
	});
	return schemaDogID.validate(id);
};
const data = () => DogName.find().sort('dogName');
const dataByName = (dogName) => DogName.find({ dogName: dogName });
const dataById = (id) => DogName.findById(id);
const dataNameById = (id) => dataById(id).select({ _id: false, dogName: true });

const DogName = moongose.model('dogs-names', dogNameSchema);

// ___________*****_GET__ROUTES_*****___________________//
router.get('/allNames', async (req, res) => {
	const dogNames = await data();
	res.send(dogNames);
});

router.get('/randomName', async (req, res) => {
	const randomDogName = getRandomItemInArray(await data());
	res.send(randomDogName);
});
// Now we do neet validation

router.get('/id/:id', async (req, res) => {
	const receivedID = req.params.id;
	try {
		const dogName = (await dataNameById(receivedID)).toObject();
		res.send(dogName);
	} catch (ex) {
		console.debug('error in ID');
		res.send(
			`The provided ID, ${receivedID},  do not exist in our database `
		);
	}
});

router.get('/name/:name', async (req, res) => {
	const receivedDogName = req.params.name;
	try {
		const dogName = await dataByName(receivedDogName);
		res.send(dogName);
	} catch (ex) {
		res.send(
			`The provided name, ${receivedDogName} do not exist in our database, `
		);
	}
});

// ___________*****_POST__ROUTES_*****___________________//

router.post('/allNames', async (req, res) => {
	try {
		const { error } = validateDogName(req.body);
		if (error) return res.send(error.details[0].message);
		const dogName = new DogName({ dogName: req.body.dogName });
		await dogName.save();

		res.send(dogName);
	} catch (error) {
		console.log('the error :' + error.message);
		res.send(error);
	}
});

// ___________*****_PATCH__ROUTE_*****___________________//
router.patch('/id/:id', async (req, res) => {
	// primeiro validar se o id eh valido
	try {
		const { error } = validateId(req.params);
		if (error) {
			return res.send(error.details[0].message);
		} else {
			const { error } = validateDogName(req.body);
			if (error) return res.send(error.details[0].message);
		}

		let dogName = req.body.dogName;
		const dog = await DogName.findByIdAndUpdate(
			req.params.id,
			{
				dogName: dogName,
			},
			{ returnDocument: 'after' }
		);
		const dogUpdated = dog;

		res.send(dogUpdated);
	} catch (error) {
		console.log('the error :' + error.message);
		res.send(error);
	}
});

// const paramExist =async(param)=> await DogName.exists({ `${param}`: `req.params.${param}` });

// ___________*****_DELETE__ROUTES_*****___________________//
router.delete('/id/:id', async (req, res) => {
	try {
		const { error } = validateId(req.params);
		if (error) {
			return res.send(error.details[0].message);
		}


		const idExist = await DogName.exists({ _id: req.params.id });
		!idExist &&
			res
				.status(400)
				.send(
					` Sorry, there is no dog's name with the id ${req.params.id}.  `
				);

		const dog = await DogName.findByIdAndDelete(req.params.id, {
			returnDocument: 'after',
		});
		res.send(
			` The ${dog.dogName}'s name was deleted from database , but certanly ${dog.dogName} was a good one. ${dog.dogName}'s id used to be:${dog.id} `
		);
	} catch (err) {
		if (err.reason === '{}')
			res.send('The id do not exist in the database');
	}
});

// ___________*****_PUT__ROUTES_*****___________________//
// We cannot change the DB ID
// router.put('/id/:id', async (req, res) => {
// 	let dogName = req.body.name;
// 	let newId = '655e1c79b90da5fcba5df28B';
// 	// parseInt(Math.floor(Math.random() * 10));
// 	const dog = await DogName.findByIdAndUpdate(
// 		req.params.id,
// 		{id: newId, dogName: dogName },
// 		{ returnDocument: 'after' }
// 	);
// 	console.log(dog);
// 	const dogUpdated = dog;

// 	res.send(dogUpdated);
// });
module.exports = router;



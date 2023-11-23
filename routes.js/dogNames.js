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
		dogName: Joi.string().alphanum().min(3).max(10).required(),
	});
	return schemaDogName.validate(dogName);
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
	const dogName = new DogName({ dogName: req.body.name });
	try {
		await dogName.save();

	} catch (ex) {
		console.log('the error :' + ex.message);
	}
			res.send(dogName);
});


		// validateDogName(dogName) && res.status(404).send('Plase, dont panic!');
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
// ___________*****_PATCH__ROUTE_*****___________________//
router.patch('/id/:id', async (req, res) => {
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
});

// ___________*****_DELETE__ROUTES_*****___________________//
router.delete('/id/:id', async (req, res) => {
	const dog = await DogName.findByIdAndDelete(req.params.id, {
		returnDocument: 'after',
	});

	res.send(
		` The ${dog.dogName}'s name was deleted from database , but certanly ${dog.dogName} was a good one.${dog.dogName}'s id used to be:${dog.id} `
	);
});
module.exports = router;




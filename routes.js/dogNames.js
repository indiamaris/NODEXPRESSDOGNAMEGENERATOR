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

const dogNameSchema = new moongose.Schema({
	dogName: {
		type: String,
		required: true,
		minlenght: 3,
		maxlength: 10,
		trim: true,
	},
});

const data = () => DogName.find().sort('dogName');
const dataByName = (dogName) => DogName.find({ dogName: dogName });
const dataById = (id) => DogName.findById(id);
const dataNameById = (id) => dataById(id).select({ _id: false, dogName: true });

// isso eh o nome da colecao eu criei caleciones
const DogName = new moongose.model('dogs-names', dogNameSchema);

// ___________*****_GET__ROUTES_*****___________________//
router.get('/allNames', async (req, res) => {
	const dogNames = await data();
	res.send(dogNames);
});

router.get('/randomName', async (req, res) => {
	const randomDogName = getRandomItemInArray(await data());
	res.send(randomDogName);
});

router.get('/id/:id', async (req, res) => {
	const dogName = (await dataNameById(req.params.id)).toObject();
	res.send(dogName);
});

router.get('/name/:name', async (req, res) => {
	const dogName = await dataByName(req.params.name);

	res.send(dogName);
});

// ___________*****_POST__ROUTES_*****___________________//

router.post('/allNames', async (req, res) => {
	const dogName = new DogName({ dogName: req.body.name });

	try {
		await dogName.save();
		console.debug(dogName);
	} catch (ex) {
		console.log('the error :' + ex.message);
	}

	res.send(dogName);
});
// ___________*****_PUT__ROUTES_*****___________________//

module.exports = router;


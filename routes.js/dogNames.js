/** @format */
const winston = require('winston');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();
router.use(express.json());
const {
	getItemInArrayById,
	getRandomItemInArray,
	getArraySize,
} = require('../utils-gets-functions/getIts');
const {
	validateId,
	validateIdFormat,
} = require('../validations/validationsID');
const validateDogName = require('../validations/validateDogName');
const { DogName } = require('../models/dogName');

const {
	findDogNames,
	findIdByDogName,
	FindDogNameById,
} = require('../models/dogName');

const { debug } = require('console');
const { randomBytes } = require('crypto');
const isAdmin = require('../middleware/isAdmin');

//___________*****_GET__ROUTES_*****___________________//

// return all dognames if user is logged.
router.get('/allNames', auth, async (req, res) => {
	const dogNames = await findDogNames();
	res.send(dogNames);
});

// return a random name, JUST a name
router.get('/randomName', [auth, isAdmin], async (req, res) => {
	const randomDogName = await getRandomItemInArray(await findDogNames());
	res.send(randomDogName.dogName);
});

// return complete data for a dog name
router.get('/randomDog', async (req, res) => {
	const dogNames = await findDogNames();
	const randomDogName = await getRandomItemInArray(dogNames);
	res.send(randomDogName);
});

router.get('/id/:id', [auth], async (req, res) => {
	const receivedID = req.params.id;
	const { error } = validateIdFormat(req.params);
	if (error) return res.status(400).send(error.message);
	else {
		if (!validateId(receivedID)) {
			return res.status(400).send('The id isnt valid');
		}
		const dogName = await FindDogNameById(receivedID);
		if (!dogName) {
			return res.status(404).send('The id do not exist in our databse');
		}
		res.send(dogName);
	}
});

router.get('/name/:dogName', [auth, isAdmin], async (req, res) => {
	let receivedDogName;

	const { error } = validateDogName(req.params);
	if (error) {
		return res.status(400).send(error.message);
	}
	receivedDogName = req.params.dogName;

	const dogName = await findIdByDogName(receivedDogName);
	if (!dogName || dogName.length === 0) {
		return res
			.status(404)
			.send(`The name ${receivedDogName} do not exist in our databse`);
	}
	res.send(dogName);
});

// ___________*****_POST__ROUTES_*****___________________//

router.post(
	'/allNames',
	[
		auth,
		// isAdmin
	],
	async (req, res) => {
		const { error } = validateDogName(req.body);

		if (error) {
			return res.status(400).send(error.message);
		}

		const dogName = new DogName({ dogName: req.body.dogName });
		await dogName.save();
		console.debug(dogName);
		res.send(dogName);
	}
);

// ___________*****_PATCH__ROUTES_*****___________________//

router.patch(
	'/updateName/:id',
	[auth, isAdmin],

	async (req, res) => {
		const { error } = validateIdFormat(req.params);
		if (error) {
			return res.status(400).send(error.message);
		} else {
			const { error } = validateDogName(req.body);
			if (error) return res.status(400).send(error.message);

			let dogName = req.body.dogName;
			const dog = await DogName.findByIdAndUpdate(
				req.params.id,
				{
					dogName: dogName,
				},
				{ returnDocument: 'after' }
			);
			res.send(dog);
		}
	}
);

router.patch('/updateId/:dogName', [auth, isAdmin], async (req, res) => {
	const { error } = validateDogName(req.params);
	if (error) {
		return res.status(400).send(error.message);
	}
	const receivedDogName = req.params.dogName;
	const dogNameToBeUpdated = await findIdByDogName(receivedDogName);
	if (dogNameToBeUpdated.length === 0) {
		return res.send(
			`The name ${receivedDogName} do not exist in the namesbase`
		);
	}
	const deletedDog = await DogName.findByIdAndDelete(
		dogNameToBeUpdated[0].id,

		{ returnDocument: 'after' }
	);
	const dogUpdated = new DogName({ dogName: req.params.dogName });
	await dogUpdated.save();
	res.send(` The new id for ${dogUpdated.dogName} now is 	 ${dogUpdated.id}`);
});

// ___________*****_DELETE__ROUTES_*****___________________//

router.delete('/id/:id', [auth, isAdmin], async (req, res) => {
	const { error } = validateIdFormat(req.params);
	if (error) {
		return res.status(400).send(error.message);
	} else {
		const idExist = await DogName.exists({
			_id: req.params.id,
		});
		if (!idExist)
			return res
				.status(400)
				.send(
					` Sorry, there is no dog's name with the id ${req.params.id}.`
				);
	}

	const dog = await DogName.findByIdAndDelete(req.params.id, {
		returnDocument: 'after',
	});
	res.send(
		` The ${dog.dogName}'s name was deleted from namesbase , but certanly ${dog.dogName} was a good one. `
	);
});

router.delete(
	'/deleteManyByName/:dogName',
	[auth, isAdmin],
	async (req, res) => {
		const toBeDeleted = req.params.dogName;
		const dogName = await findIdByDogName(toBeDeleted);
		if (dogName.length === 0) {
			return res.send(
				`The name ${toBeDeleted} do not exist in the namesbase`
			);
		}
		console.debug(dogName);

		const dog = await DogName.deleteMany(
			{ dogName: toBeDeleted },
			{
				returnDocument: 'after',
			}
		);
		res.send(
			` The ${toBeDeleted}'s name was deleted ${dog.deletedCount} times from namesbase , but certanly ${toBeDeleted} was a good one. `
		);
	}
);

module.exports = router;


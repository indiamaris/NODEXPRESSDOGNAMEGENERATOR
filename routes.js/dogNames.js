/** @format */
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
	validateDogName,
	validateIdFormat,
	DogName,
} = require('../models/names');

const { names, findByName, nameById } = require('../models/names');

const { debug } = require('console');
const { randomBytes } = require('crypto');
//___________*****_GET__ROUTES_*****___________________//
/* This code defines a GET route for the '/allNames' endpoint. When a GET request is made to this
endpoint, it retrieves all the dog names from the database using the `names()` function and sends
the dog names as the response. */

// return all the names in DB
router.get('/allNames', async (req, res) => {
	const dogNames = await names();
	res.send(dogNames);
});


/* This code defines a GET route for the '/randomName' endpoint. When a GET request is made to this
endpoint, it retrieves a random dog name from the database using the `getRandomItemInArray` function
and sends the dog name as the response. */

// return a random name, JUST a name 
router.get('/randomName', async (req, res) => {
	const randomDogName = await getRandomItemInArray(await names());
	res.send(randomDogName.dogName);
});

/* This code defines a GET route for the '/randomDog' endpoint. When a GET request is made to this
endpoint, it retrieves all the dog names from the database using the `names()` function, selects a
random dog name using the `getRandomItemInArray` function, and sends the random dog name as the
response. */
// return complete data for a dog name 
router.get('/randomDog', async (req, res) => {
	const dogNames = await names();
	const randomDogName = await getRandomItemInArray(dogNames);
	res.send(randomDogName);
});



/* This code defines a GET route for the '/id/:id' endpoint. When a GET request is made to this
endpoint, it retrieves a dog name from the database based on the provided ID. */
router.get('/id/:id', async (req, res) => {
	try {
		const receivedID = req.params.id;
		const { error } = validateIdFormat(req.params);
		if (error) return res.status(400).send(error.message);
		else {
			if (!validateId(receivedID)) {
				return res.status(400).send('The id isnt valid');
			}
			const dogName = await nameById(receivedID);
			if (!dogName) {
				return res
					.status(404)
					.send('The id do not exist in our databse');
			}
			res.send(dogName);
		}
	} catch (error) {
		res.send(error.message);
	}
});

/* This code defines a GET route for the '/name/:dogName' endpoint. When a GET request is made to this
endpoint, it retrieves a dog name from the database based on the provided dogName parameter. */
router.get('/name/:dogName', async (req, res) => {
	let receivedDogName;
	try {
		const { error } = validateDogName(req.params);
		if (error) {
			return res.status(400).send(error.message);
		}
		receivedDogName = req.params.dogName;

		const dogName = await findByName(receivedDogName);
		if (!dogName || dogName.length === 0) {
			return res
				.status(404)
				.send(
					`The name ${receivedDogName} do not exist in our databse`
				);
		}
		res.send(dogName);
	} catch (ex) {
		res.status(500).send('Internal Error');
	}
});

// ___________*****_POST__ROUTES_*****___________________//

/* This code defines a POST route for the '/allNames' endpoint. When a POST request is made to this
endpoint, it validates the dog name provided in the request body using the `validateDogName`
function. If there is an error in the validation, it sends a 400 status code with the error message
as the response. */
router.post('/allNames',auth, async (req, res) => {

	try {
		const { error } = validateDogName(req.body);
		if (error) return res.status(400).send(error.message);
		const dogName = new DogName({ dogName: req.body.dogName });
		await dogName.save();
		console.debug(dogName);
		res.send(dogName);
	} catch (error) {
		console.log(error.message);
		res.status(500).send('Internal Error');
	}
});

// ___________*****_PATCH__ROUTES_*****___________________//

/* This code defines a PATCH route for updating a dog name in the database. When a PATCH request is
made to the '/updateName/:id' endpoint, it first validates the ID format and the dog name provided
in the request. If there is an error in the validation, it sends a 400 status code with the error
message as the response. */
router.patch('/updateName/:id', async (req, res) => {
	try {
		const { error } = validateIdFormat(req.params);
		if (error) {
			return res.status(400).send(error.message);
		} else {
			const { error } = validateDogName(req.body);
			if (error) return res.status(400).send(error.message);
		}

		let dogName = req.body.dogName;
		const dog = await DogName.findByIdAndUpdate(
			req.params.id,
			{
				dogName: dogName,
			},
			{ returnDocument: 'after' }
		);

		res.send(dog);
	} catch (error) {
		res.status(500).send(error.message);
	}
});

/* This code defines a PATCH route for updating a dog name in the database. When a PATCH request is
made to the '/updateId/:dogName' endpoint, it first validates the dog name provided in the request
parameter using the `validateDogName` function. If there is an error in the validation, it sends a
400 status code with the error message as the response. */
router.patch('/updateId/:dogName', async (req, res) => {
	try {
		const { error } = validateDogName(req.params);
		if (error) {
			return res.status(400).send(error.message);
		}
		const receivedDogName = req.params.dogName;
		const dogNameToBeUpdated = await findByName(receivedDogName);
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
		console.debug(dogUpdated);
		res.send(
			` The new id for ${dogUpdated.dogName} now is 	 ${dogUpdated.id}`
		);
	} catch (error) {
		res.status(500).send(error.message);
	}
});
// ___________*****_DELETE__ROUTES_*****___________________//
/* This code defines a DELETE route for deleting a dog name from the database based on the provided ID.
When a DELETE request is made to the '/id/:id' endpoint, it first validates the ID format using the
`validateIdFormat` function. If there is an error in the validation, it sends a 400 status code with
the error message as the response. */
router.delete('/id/:id', async (req, res) => {
	try {
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

		// 	sintaxe que parece nao funcionar
		// 			/!idExist &&

		// 			res
		// 				.status(400)
		// 				.send(
		// 					` Sorry, there is no dog's name with the id ${req.params.id}. `
		// 			);

		// };

		const dog = await DogName.findByIdAndDelete(req.params.id, {
			returnDocument: 'after',
		});
		res.send(
			` The ${dog.dogName}'s name was deleted from namesbase , but certanly ${dog.dogName} was a good one. `
		);
	} catch (err) {
		res.status(500).send('Internal Errores');
	}
});

/* This code defines a DELETE route for deleting multiple dog names from the database based on the
provided dog name. When a DELETE request is made to the '/deleteManyByName/:dogName' endpoint, it
first retrieves the dog names from the database using the `findByName` function. If there are no dog
names found with the provided name, it sends a response indicating that the name does not exist in
the database. If there are dog names found, it uses the `deleteMany` function to delete all the dog
names with the provided name from the database. It then sends a response indicating the number of
dog names deleted and a message acknowledging the deletion. */
router.delete('/deleteManyByName/:dogName', async (req, res) => {
	const toBeDeleted = req.params.dogName;

	try {
		const dogName = await findByName(toBeDeleted);
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
	} catch (err) {
		if (err.reason === '{}') res.send('Internal Error');
	}
});



module.exports = router;



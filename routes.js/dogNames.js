/** @format */
const Joi = require('joi');
const data = require('../fakeDB/data');
const { getArraySize } = require('../utils-gets-functions/getArraySize');
const express = require('express');
const router = express.Router();
const {
	getRandomItemInArray,
} = require('../utils-gets-functions/getRandomItemInArray');
const {
	getItemInArrayById,
} = require('../utils-gets-functions/getItemInArrayById');
// base route./
/*  `Defining a route handler for the GET request to
the root URL ("/") of the server.ir returns all data */

router.get('/allNames', (req, res) => {
	res.send(data);
});

/* Defining a route handler for the GET request to the '/randomName' endpoint. When this
endpoint is accessed, it will generate a random dog name by calling the `getRandomItemInArray`
function and passing in the `data.data` array. The generated random dog name is then logged to the
console, along with the size of the `data.data` array. Finally, the random dog name is sent as the
response to the client. */
router.get('/randomName', (req, res) => {
	const randomDogName = getRandomItemInArray(data.data);
	console.log(randomDogName);
	console.log(getArraySize(data.data));
	res.send(randomDogName);
});

/* Defining a route handler for the GET request to the '/id/:id' endpoint. Is send a name based on required id */
router.get('/id/:id', (req, res) => {
	const id = parseInt(req.params.id);
	const name = getItemInArrayById(id, data.data, 'id');
	res.send(name);
});

/* Defining a route handler for the POST request to the '/allNames'
endpoint. */
router.post('/allNames', (req, res) => {
	/* Defining a schema using the Joi library for validating the request body of a POST
	request. */
	const schema = Joi.object({
		name: Joi.string()
			.min(2)
			.pattern(/^[a-zA-Z]+$/)
			.required(),
	});
	/* Using the Joi library to validate the request body of a POST request. */
	const { error, result } = schema.validate(req.body);
	if (error) {
		return res.status(400).send(` Please be attentive, ${error.message} `);
	}

	/* Creating a new object called `newName` from the user input. */
	/* The line `id: getArraySize(data.data) + 1` is assigning a unique ID to the new name being added to the `data.data` array.  The line `name: req.body.name` is assigning the value of the `name` property from the request body to the `name` property of the `newName` object. */
	const newName = {
		id: getArraySize(data.data) + 1,

		name: req.body.name,
	};
	// I am using unshift over push because its easy for me test the array in Postman.
	data.data.unshift(newName);
	res.send(newName);
});

/* ` Exporting the `router` object so that it can be used in other files.
When a file is required using `require()`, the exported object is returned. In this case, the
`router` object is being exported so that it can be used in the main application file or any other
file that requires this router. */
module.exports = router;


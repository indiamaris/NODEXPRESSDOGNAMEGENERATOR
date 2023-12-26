/** @format */

const express = require('express');
const router = express.Router();

// base route./

router.get('/', (req, res) => {
	res.send({
		title: 'Next Dog Name',
		message: 'A api with some dog names sugestions!',
	});
});

router.get('/documentation', (req, res) => {
	res.send({
		title: 'Next Dog Name',
		message: 'In the future the complete documentation!',
	});
});

module.exports = router;

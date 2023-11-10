/** @format */

/* The code `const express = require('express');` is importing the Express module, which is a web
application framework for Node.js. It allows us to create server-side applications and handle HTTP
requests and responses. */
const express = require('express');
const router = express.Router();

// base route./
/*  `Defining a route handler for the GET request to
the root URL ("/") of the server. */
router.get('/', (req, res) => {
	res.send({
		title: 'Next Dog Name',
		message: 'A api with some dog names sugestions!',
	});
});

/* The code `router.get('/documentation', (req, res) => { ... })` is defining a route handler for the
GET request to the "/documentation" URL of the server. */
router.get('/documentation', (req, res) => {
	res.send({
		title: 'Next Dog Name',
		message: 'In the future the complete documentation!',
	});
});

/* ` Exporting the `router` object so that it can be used in other files.
When a file is required using `require()`, the exported object is returned. In this case, the
`router` object is being exported so that it can be used in the main application file or any other
file that requires this router. */
module.exports = router;



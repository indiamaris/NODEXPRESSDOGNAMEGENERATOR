/**
 * eslint-disable no-undef
 *  eslint-disable @typescript-eslint/no-var-requires
 *
 * @format



/* This code is setting up a basic Express server. */
const express = require('express');
/* The line `const config = require('config');` is importing the `config` module. This module is used
to load configuration files for the application. It allows you to define different configurations
for different environments (e.g., development, production) and easily switch between them. The
`config` module provides a simple way to access the configuration values defined in the
configuration files. */
const config = require('config');

/* `config.get('dogNames_PrivateKey');` is retrieving the value of the configuration property named
'dogNames_PrivateKey' from the configuration files. The `config` module allows you to define
different configurations for different environments, and `config.get()` is used to access the values
defined in those configurations. In this case, it is retrieving the value of the
'dogNames_PrivateKey' property, which could be used for some specific functionality in the
application. */
const privateKey = config.get('jwtPrivateKey')
if (!privateKey) {
	console.error('FATAL ERROR');
	process.exit(1);
}

/* `const app = express();` is creating an instance of the Express application. This instance will be
used to define the routes and middleware for the server. */
const app = express();
/* `app.use(express.json());` is setting up middleware in the Express server to parse incoming requests
with JSON payloads. It allows the server to automatically parse the request body as JSON and make it
available in `req.body` for further processing. */
app.use(express.json());
/* The next line  is setting the port number for the Express server
to listen on. */
const PORT = process.env.PORT || 3000;

/**
 * The above function connects to a MongoDB database named "DogNames" and logs a message indicating
 * whether the connection was successful or not.
 */
const moongose = require('mongoose');
async function main() {
	await moongose
		.connect('mongodb://localhost/DogsNames ')
		.then(() => console.log('conectedissimo'));
}

main().catch((err) => {
	console.error('not conectedi', err);
});

/* The next code  is setting up middleware in the Express server.
Middleware functions are functions that have access to the request (`req`) and response (`res`)
objects, as well as the next middleware function in the application's request-response cycle. */
app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'POST, GET, PUT');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
	next();
});

// ___________________ROUTES ________________________
/* `const base = require('./routes.js/root');` is importing the `root` module from the `routes.js` file. The `root` module is responsible for handling requests to the root path ("/") of the server. The imported module is assigned to the variable `base`, which is later used as middleware in the Express server to handle requests to the root path. */
const base = require('./routes.js/root');
app.use('/', base);
const dogNames = require('./routes.js/dogNames');
/* `app.use('/api', dogNames);` is setting up a middleware function in the Express server. This
middleware function is responsible for handling requests that start with the '/api' path. It is
using the `dogNames` module to handle these requests. */
app.use('/api', dogNames);
/* The line `const users = require('./routes.js/users');` is importing the `users` module from the
`routes.js` file. The `users` module is responsible for handling requests related to user data. The
imported module is assigned to the variable `users`, which can be used later as middleware in the
Express server to handle requests related to users. */
const users = require('./routes.js/users');
app.use('/api/users', users);
/* Starting the Express server and making it listen on the specified port number (`PORT`). When the
server starts listening, it will execute the callback function, which in this case is logging the
message "Listen to your heart When he's calling for you" to the console. */

const auth = require('./routes.js/auth');
app.use('/api/auth', auth);

app.listen(PORT, () =>
	console.log(`Listen to your heart 
When he's calling for you`)
);




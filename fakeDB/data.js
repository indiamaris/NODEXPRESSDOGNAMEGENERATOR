/** @format */

/* The line `const fs = require('fs');` is importing the built-in Node.js module `fs`, which stands for
"file system". This module provides functions for interacting with the file system, such as reading
and writing files. By assigning `require('fs')` to the variable `fs`, you can use the functions
provided by the `fs` module in your code. */
const fs = require('fs');

/* The line `const fakeDB = JSON.parse(fs.readFileSync('./fakeDB/fakeDB.json', 'utf8'));` is reading
the contents of the file './fakeDB/fakeDB.json' synchronously using the `fs.readFileSync` method. It
then parses the contents of the file as JSON using `JSON.parse` and assigns the resulting object to
the variable `fakeDB`. */
const fakeDB = JSON.parse(fs.readFileSync('./fakeDB/fakeDB.json', 'utf8'));
/* The line `const data = fakeDB.data;` is assigning the value of the `data` property from the `fakeDB`
object to the variable `data`. This allows you to access the `data` property of the `fakeDB` object
using the `data` variable in the rest of your code. */
const data = fakeDB.data;
/* `module.exports = { data };` is exporting the `data` variable from the current module. This allows
other modules to import and use the `data` variable. When another module imports this module, they
can access the `data` variable by using `require` and accessing the exported object's `data`
property. */
module.exports = { data };



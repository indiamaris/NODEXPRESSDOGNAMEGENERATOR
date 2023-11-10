/** @format */

/* The code is exporting a JavaScript module that contains a function called `getItemInArrayById`. 
The `getItemInArrayById` function takes three parameters: `item`, `arr`, and `param`. It uses the `find` method to search through the `arr` array and returns the first element that has a property `param` with a value equal to `item`. */
module.exports = {
	getItemInArrayById: (item, arr, param) =>
		arr.find((n) => n[param] === item),
};


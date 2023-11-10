/** @format */
module.exports = {
	/* The `getArraySize` function is a method that takes an array as an argument (`arr`). It uses the`Object.keys()` method to get an array of the keys in the `arr` object, and then returns the length of that array. Essentially, it is returning the number of keys in the `arr` object, which can be used to determine the size of the array. */
	getArraySize: (arr) => Object.keys(arr).length,
};


/** @format */

/* This code is importing two functions, `getRandomNumber` and `getArraySize`, from two separate files (`getRandomNumber.js` and `getArraySize.js`). */
const { getRandomNumber } = require('./getRandomNumber');
const { getArraySize } = require('./getArraySize');
module.exports = {
	/* The `getRandomItemInArray` function takes an array `data` as input. It uses the `getArraySize`function to determine the size of the array. Then, it uses the `getRandomNumber` function togenerate a random index within the range of the array size. Finally, it returns the item at the randomly generated index from the `data` array. */
	getRandomItemInArray: (data) => data[getRandomNumber(getArraySize(data))],
};


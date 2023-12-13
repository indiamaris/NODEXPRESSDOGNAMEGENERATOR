/** @format */

const getArraySize = (arr) => Object.keys(arr).length;
const getRandomNumber = (max) => Math.floor(Math.random() * max);
const getItemInArrayById = (item, arr, param) =>
	arr.find((n) => n[param] === item);
const getRandomItemInArray = async (data) =>
	data[getRandomNumber(getArraySize(data))];
exports.getItemInArrayById = getItemInArrayById;
exports.getRandomItemInArray = getRandomItemInArray;
exports.getArraySize = getArraySize;

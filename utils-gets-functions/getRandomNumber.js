/** @format */
/* This code exports an object with a single method called `getRandomNumber`. This method takes a parameter `max` and returns a random number between 0 (inclusive) and `max` (exclusive). The `Math.random()` function generates a random decimal number between 0 and 1, and multiplying it by `max` and flooring the result gives a random integer between 0 and `max - 1`. */

module.exports = { getRandomNumber: (max) => Math.floor(Math.random() * max) };


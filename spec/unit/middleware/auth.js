// /** @format */
// const mongoose = require('mongoose');
// const { DogName } = require('../../../models/dogName');
// const { User } = require('../../../models/user');
// const { auth } = require('../../../middleware/auth');
// describe('auth middleware', () => {
// 	it('should populate req.user with the payload of a valid JWT', () => {
// 		const user = { _id: mongoose.Types.ObjectId(), isAdmin: true };
// 		const token = new User(user).generateAuthToken();
// 		const req = {
// 			reader: jest.fn().mockReturnValue(token),
// 		};

// 		const res = {};
// 		const next = jest.fn();
// 		auth(req, res, next);
// 		expect(req.user).toBeDefined();
// 	});
// });


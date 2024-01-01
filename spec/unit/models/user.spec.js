/** @format */
const config = require('config');
const jwt = require('jsonwebtoken');
const { User } = require('../../../models/user');
const mongoose = require('mongoose');
describe('Generate Auth Token', () => {
	it('return a valid JWT token', () => {
		const payload = { _id: new mongoose.Types.ObjectId().toHexString(), isAdmin: true };
		const user = new User(payload);
		const token = user.generateAuthToken();
		const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
		expect(decoded).toMatchObject(payload);
	});
});

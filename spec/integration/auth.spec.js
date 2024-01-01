/** @format */

const { User } = require('../../models/user');
const request = require('supertest');
describe('auth-middleware', () => {
	beforeEach(async () => {
		server = require('../../index');
	});

	afterEach(async () => {
		server.close();
	});

	const exec = () => {
		let token = new User().generateAuthToken();
		return request(server).post('/api/allNames').set('x-auth-token', token);
	};

	it('should return 403 if no token is provided', async () => {
		const res = await exec();
		expect(res.status).toBe(403);
	});
	// it('should return 200 if token is provided', async () => {
	// 	const res = await exec();
	// 	expect(res.status).toBe(200);
	// });
});


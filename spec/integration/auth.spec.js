/** @format */
const { DogName } = require('../../models/dogName');
const { User } = require('../../models/user');
const request = require('supertest');
let server;
describe('auth-middleware', () => {
	const closeServer = (server) => {
		jest.useRealTimers();
		return new Promise((resolve) => {
			server.close((err) => {
				resolve();
			});
		});
	};
	beforeEach(() => {
		server = require('../../index');
		token = new User().generateAuthToken();
	});

	afterEach(async () => {
		jest.setTimeout(100000);
		await closeServer(server);
		await DogName.deleteMany({});
	});
	let token;

	const exec = () => {
		return request(server)
			.post('/api/allNames')
			.set('x-auth-token', token)
			.send({ dogName: 'HENRICO' });
	};

	it('should return 401 if no token is provided', async () => {
		token = '';
		const res = await exec();
		expect(res.status).toBe(401);
	});

	it('should return 400 if no valid token is provided', async () => {
		token = null;
		const res = await exec();
		expect(res.status).toBe(400);
	}); 
	it('should return 200 if token is provided', async () => {
		const res = await exec();
		expect(res.status).toBe(200);
	});
});



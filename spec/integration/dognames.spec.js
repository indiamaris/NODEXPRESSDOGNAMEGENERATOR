/** @format */
const request = require('supertest');
const { DogName } = require('../../models/dogName');
const { User } = require('../../models/user');
let server;
describe('api/allNames', () => {
	beforeEach(() => {
		server = require('../../index');
	});
	afterEach(async () => {
		server.close();
		await DogName.deleteMany({});
	});
	let token = new User().generateAuthToken();
	const getServerRequest = async (toMethod, toRoute, toSend) => {
		return await request(server)
			[toMethod](toRoute)
			.set('x-auth-token', token)
			.send(toSend);
	};
	// 1- return all dog names if user is logged
	describe('GET/api/allNames', () => {
		it('return all dognames if user is logged', async () => {
			await DogName.collection.insertMany([
				{ dogName: 'Afranio' },
				{ dogName: 'Frederica' },
			]);
			const endPoint = '/api/allNames';
			const res = await getServerRequest('get', endPoint);
			expect(res.status).toBe(200);
			expect(res.body.length).toBe(2);
			expect(
				res.body.some((g) => g.dogName === 'Frederica')
			).toBeTruthy();
			expect(res.body[1].dogName === 'Frederica').toBeTruthy();
		});
	});

	// 2- return a 401 -bad request status- if id is invalid
	describe('GET /:id', () => {
		it('should return a 401 -bad request status- if id is invalid', async () => {
			const endPoint = '/api/id/:null';
			const res = await getServerRequest('get', endPoint);
			expect(res.status).toBe(400);
		});
		it('should return a dogName if id is valid', async () => {
			const dogName = new DogName({ dogName: 'Gilbertina' });
			await dogName.save();
			const endPoint = '/api/id/' + dogName._id;
			const res = await getServerRequest('get', endPoint);
			const teste = res.status;
			expect(teste).toBe(200);
			expect(res.body).toHaveProperty('dogName', dogName.dogName);
		});
	});

	// 3- return a 401 if user isn't logged in.
	describe('GET / ', () => {
		it('should return a 401 if client is not logged in', async () => {
			token = 'invalid Token For Test';
			const name = { name: 'testName' };
			const res = await getServerRequest('get', '/api/allNames', name);
			expect(res.status).toBe(400);
		});
	});
});


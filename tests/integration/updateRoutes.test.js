const app = require('../../src/app.js')
const request = require('supertest');

const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

describe('Update route test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => sequelize.close());

    it('should return 200 if user is updated', async () => {
        const userA = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 19,
            cpf: '19066979062'
        };

        const userB = {
            ...userA,
            id: 1,
            age: 22
        };

        let response = await request(app)
            .post('/users')
            .send(userA);

        expect(response.status).toBe(201);

        response = await request(app)
            .patch('/users/1')
            .send(userB);

        expect(response.status).toBe(200);
    });

    it('should return 403 if trying to update with illegal info', async () => {
        const userA = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 19,
            cpf: '19066979062'
        };

        const userB = {
            ...userA,
            id: 1,
            age: 16
        };

        let response = await request(app)
            .post('/users')
            .send(userA);

        expect(response.status).toBe(201);

        response = await request(app)
            .patch('/users/1')
            .send(userB);

        expect(response.status).toBe(403);
    });
});
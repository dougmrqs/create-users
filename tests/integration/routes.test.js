const app = require('../../src/app.js')
const request = require('supertest');

const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

describe('Creation route test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => sequelize.close());

    it('should return 201 if user is created', async () => {
        const user = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 19,
            cpf: '19066979062'
        }

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(201);
    });

    it('should return 400 if user sent invalid age', async () => {
        const user = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 16,
            cpf: '19066979062'
        }

        const response = await request(app)
            .post('/users')
            .send(user)

        expect(response.status).toBe(400);
    });

    it('should return 400 if user sent invalid cpf', async () => {
        const user = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 19,
            cpf: '11111111111'
        }

        const response = await request(app)
            .post('/users')
            .send(user)

        expect(response.status).toBe(400);
    });

    it('should return 409 if user already exists', async () => {
        const user = {
            name: 'Foo',
            email: 'fake@mail.com',
            age: 19,
            cpf: '19066979062'
        }

        await request(app).post('/users').send(user);

        const response = await request(app)
            .post('/users')
            .send(user);

        expect(response.status).toBe(409);
    });
});
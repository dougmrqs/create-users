const app = require('../../src/app.js')
const request = require('supertest');

const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const insertUser = require('../utils/insertUser');

describe('Update route test', () => {
    beforeEach(async () => {
        await truncate();
        await insertUser();
    });

    afterAll(async () => sequelize.close());

    it('should return 200 if user is updated', async () => {

        const userB = {
            id: 1,
            age: 22
        };

        const response = await request(app)
            .patch('/users/1')
            .send(userB);

        expect(response.status).toBe(200);
    });

    it('should return 403 if trying to update with illegal info', async () => {

        const userB = {
            id: 1,
            age: 16
        };

        const response = await request(app)
            .patch('/users/1')
            .send(userB);

        expect(response.status).toBe(403);
    });
});
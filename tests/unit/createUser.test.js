const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const createUser = require('../../src/app/user/createUser');

describe('User creation', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => await sequelize.close());

    it('should return a created user', async () => {
        try {
            const user = await createUser('Duglas', 'd@d.com', '24883145018', 27)
            expect(user).toHaveProperty('name', 'Duglas')
            expect(user).toHaveProperty('cpf', '24883145018')
            expect(user).toHaveProperty('age', 27)
        }
        catch (error) {
            expect(error).toBe(false)
        }
    });

    it('should return invalid age', async () => {
        try {
            await createUser('Duglas', 'd@d.com', '24883145018', 16)
        }
        catch (error) {
            expect(error.status).toBe('INVALID_AGE')
        }
    });

    it('should return invalid cpf', async () => {
        try {
            await createUser('Duglas', 'd@d.com', '24883145017', 27)
        }
        catch (error) {
            expect(error.status).toBe('INVALID_CPF')
        }
    });
});
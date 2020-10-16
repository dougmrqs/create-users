const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const userRepo = require('../../src/infra/user/userRepository');
const { User } = require('../../src/domain/user')

describe('Creation route test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => await sequelize.close());

    it('should return not found', async () => {
        try {
            await userRepo.findByCpf('11111111111')
        }
        catch (error) {
            expect(error.status).toBe('NOT_FOUND');
        };
    });

    it('should return user already exists', async () => {
        const user = new User('Douglas', 'd@d.com', '24883145018', 27)
        try {
            await userRepo.addOne(user)
            await userRepo.addOne(user)
        } catch (error) {
            expect(error.status).toBe('ALREADY_EXISTS')
        }
    });
});
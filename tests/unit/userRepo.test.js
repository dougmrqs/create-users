const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const userRepo = require('../../src/infra/user/userRepository');

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
        try {
            await userRepo.createOne('Douglas', 'd@d.com', '24883145018', 27)
            await userRepo.createOne('Douglas', 'd@d.com', '24883145018', 27)
        } catch (error) {
            expect(error.status).toBe('ALREADY_EXISTS')
        }
    });
});
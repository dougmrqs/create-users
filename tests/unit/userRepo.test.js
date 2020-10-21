const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const UserRepository = require('../../src/infra/user/userRepository');
const { User: UserModel } = require('../../src/infra/database/models')

const userRepo = new UserRepository({ UserModel })

describe('Creation route test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => await sequelize.close());

    it('should return a user by its cpf', async () => {
        const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 }

        try {
            await userRepo.addOne(user);
            const foundUser = await userRepo.findByCpf(user.cpf)
            expect(foundUser).toHaveProperty('id')
            expect(foundUser).toHaveProperty('name', user.name)
            expect(foundUser).toHaveProperty('email', user.email)
            expect(foundUser).toHaveProperty('cpf', user.cpf)
            expect(foundUser).toHaveProperty('age', user.age)
        } catch (error) {
            console.log(error)
        }
    });

    it('should return not found', async () => {
        try {
            await userRepo.findByCpf('11111111111')
        }
        catch (error) {
            expect(error.status).toBe('NOT_FOUND');
        };
    });

    it('should return user already exists', async () => {
        const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 }

        try {
            await userRepo.addOne(user)
            await userRepo.addOne(user)
        } catch (error) {
            expect(error.status).toBe('ALREADY_EXISTS')
        }
    });
});
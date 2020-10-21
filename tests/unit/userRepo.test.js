const truncate = require('../utils/truncate.js');
const { sequelize } = require('../../src/infra/database/models/index');

const UserRepository = require('../../src/infra/user/userRepository');
const { User: UserModel } = require('../../src/infra/database/models')

const userRepo = new UserRepository({ UserModel })

describe('Creation route test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => await sequelize.close());

    describe('When looking for an already registered user', () => {
        it('should return a user by its cpf', async () => {
            const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 }

            await userRepo.addOne(user);
            const foundUser = await userRepo.findByCpf(user.cpf)
            expect(foundUser).toHaveProperty('id')
            expect(foundUser).toHaveProperty('name', user.name)
            expect(foundUser).toHaveProperty('email', user.email)
            expect(foundUser).toHaveProperty('cpf', user.cpf)
            expect(foundUser).toHaveProperty('age', user.age)
        });
    });

    describe('Passing a non-registered CPF', () => {
        it('should return not found', async () => {
            await expect(
                userRepo.findByCpf('11111111111')
            ).rejects.toThrowError('User not found')
        });
    });

    describe('When trying to add the same user twice, looking at its CPF', () => {
        it('should return user already exists', async () => {
            const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 }

            const newUser = await userRepo.addOne(user);
            expect(newUser).toHaveProperty('name', user.name)

            await expect(
                userRepo.addOne(user)
            ).rejects.toThrowError('User already exists');

        });
    });
});
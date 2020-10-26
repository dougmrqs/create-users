const truncate = require('../../utils/truncate.js');
const { sequelize } = require('../../../src/infra/database/models/index');

const UserRepository = require('../../../src/infra/user/userRepository');
const { User: UserModel } = require('../../../src/infra/database/models')

const userRepo = new UserRepository({ UserModel })

describe('User Repository test', () => {
    beforeEach(async () => await truncate());

    afterAll(async () => await sequelize.close());

    describe('User Creation', () => {
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



    describe('User Updating', () => {
        describe('When sending age to an existing user', () => {
            it('should return the user with the updated age', async () => {
                const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 };

                const addedUser = await userRepo.addOne(user);

                const newUser = {
                    ...user,
                    id: addedUser.id,
                    age: 28
                };

                // console.log(newUser);

                const updatedUser = await userRepo.updateOne(newUser);

                expect(updatedUser).toHaveProperty('age', newUser.age);
                expect(updatedUser).not.toHaveProperty('age', user.age);

            });
        });

        describe('When sending a new email to an existing user', () => {
            it('should return the user with the updated email', async () => {
                const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 };

                await userRepo.addOne(user);

                const newData = {
                    ...user,
                    email: 'e@mail.com'
                };

                const updatedUser = await userRepo.updateOne(newData);

                expect(updatedUser).toHaveProperty('email', newData.email);
                expect(updatedUser).not.toHaveProperty('email', user.email);

            });
        });

        describe('When sending just the parameter to be changed', () => {
            it('should maintain other fields as is', async () => {
                const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 };

                await userRepo.addOne(user);

                const updatedData = { email: 'e@mail.com', cpf: '24883145018' }

                const updatedUser = await userRepo.updateOne(updatedData);

                expect(updatedUser).toHaveProperty('name', user.name);
                expect(updatedUser).toHaveProperty('age', user.age);

            });
        });

        describe('When sending two parameters to be changed', () => {
            it('should maintain other fields as is', async () => {
                const user = { name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 };

                await userRepo.addOne(user);

                const updatedData = { email: 'e@mail.com', age: 28, cpf: '24883145018' }

                const updatedUser = await userRepo.updateOne(updatedData);

                expect(updatedUser).toHaveProperty('name', user.name);
                expect(updatedUser).toHaveProperty('age', updatedData.age);
                expect(updatedUser).toHaveProperty('email', updatedData.email);

            });
        });
    });
});
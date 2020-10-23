const makeUpdateUser = require('../../../src/app/user/updateUser');

const { User } = require('../../../src/domain/user')

const fakeUserRepository = {

    findById: async (id) => {
        const user = new User({
            id: id,
            cpf: '91932396020',
            name: 'John',
            email: 'e@mail.com',
            age: 22
        })
        return Promise.resolve(user)
    },

    updateOne: async (userData) => {

        return Promise.resolve(userData)
    }
}

describe('Update User use cases', () => {
    describe('When giving one of the allowed parameters to be changed', () => {
        it('should return the object with the updated data', async () => {
            const updateUser = makeUpdateUser({ userRepository: fakeUserRepository });

            const userData = { id: 1, name: 'John', cpf: '91932396020', email: 'e@mail.com', age: 26 }

            const updatedUser = await updateUser(userData);

            expect(updatedUser).toHaveProperty('age', userData.age);
            expect(updatedUser).toHaveProperty('email', userData.email);
            expect(updatedUser).toHaveProperty('cpf', userData.cpf);
        });
    });

    describe('When trying to update age to an unauthourized value', () => {
        it('should return invalid age', async () => {
            const updateUser = makeUpdateUser({ userRepository: fakeUserRepository });

            const userData = { cpf: '91932396020', email: 'e@mail.com', age: 16 }

            await expect(updateUser(userData)).rejects.toThrowError('Invalid age')
        });
    });

    describe('When trying to update an unauthourized field', () => {
        it('should not update user', async () => {
            const updateUser = makeUpdateUser({ userRepository: fakeUserRepository });

            const userData = { cpf: '91932396020', name: 'Joe' }

            const updatedUser = await updateUser(userData)

            expect(updatedUser).not.toHaveProperty('name', userData.name);
        });
    });
});
const makeCreateUser = require('../../src/app/user/createUser');

const fakeUserRepository = {

    addOne: (user) => {
        user.id = 1;
        return user;
    },

};

const FUR = {
    addOne: (user) => {
        const error = new Error('User already exists');
        error.status = 'ALREADY_EXISTS';
        throw error
    }
};


describe('User creation', () => {

    describe('when all data sent are valid', () => {
        it('should return a created user', async () => {
            const createUser = makeCreateUser({ userRepository: fakeUserRepository });

            try {
                const user = await createUser({ name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 });

                expect(user).toHaveProperty('name', 'Douglas');
                expect(user).toHaveProperty('cpf', '24883145018');
                expect(user).toHaveProperty('age', 27);
            }
            catch (error) {
                console.log(error);
                throw error
            };
        });
    });

    describe('when the age is less than the minimum specified at domain rules', () => {
        it('should return invalid age', async () => {
            const createUser = makeCreateUser({ userRepository: fakeUserRepository });

            try {
                await createUser({ name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 16 })
            }
            catch (error) {
                expect(error.status).toBe('INVALID_AGE')
            }
        });
    });

    describe('when cpf is not valid, based on validation module', () => {
        it('should return invalid cpf', async () => {
            const createUser = makeCreateUser({ userRepository: fakeUserRepository });

            try {
                await createUser({ name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 })
            }
            catch (error) {
                expect(error.status).toBe('INVALID_CPF')
            }
        });
    });

    describe('when a user is already registered', () => {
        it('should return already exists', async () => {
            const createUser = makeCreateUser({ userRepository: FUR });

            try {
                await createUser({ name: 'Douglas', email: 'd@d.com', cpf: '24883145018', age: 27 })
            }
            catch (error) {
                expect(error.status).toBe('ALREADY_EXISTS')
            }
        });
    });
});
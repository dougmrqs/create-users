const UserRepository = require('../../src/infra/user/userRepository');
const { User: UserModel } = require('../../src/infra/database/models');

const userRepository = new UserRepository({ UserModel })

const user = {
    name: 'Foo',
    email: 'fake@mail.com',
    age: 19,
    cpf: '19066979062'
};

async function insertUser() {
    await userRepository.addOne(user);
}

module.exports = insertUser;
const { User } = require('../database/models');
const domainUser = require('../../domain/user/User')

class UserRepository {

    async findByCpf(cpf) {

        const foundUser = await User.findOne({ where: { cpf: cpf } })

        if (!foundUser) {
            const error = new Error('User not found');
            error.status = 'NOT_FOUND';
            throw error
        }
        const user = new domainUser(foundUser.name, foundUser.email, foundUser.cpf, foundUser.age)
        user.id = foundUser.id;
        return user
    }

    async addOne(user) {

        const userFound = await User.findOne({ where: { cpf: user.cpf } })

        if (!userFound) {

            const createdUser = await User.create(
                {
                    name: user.name,
                    email: user.email,
                    cpf: user.cpf,
                    age: user.age
                });

            user.id = createdUser.id

            return user
        }

        else if (userFound) {
            const error = new Error('User already exists')
            error.status = 'ALREADY_EXISTS'
            throw error
        };


    };

};

module.exports = new UserRepository();
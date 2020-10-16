const { User } = require('../database/models');

class UserRepository {

    async findByCpf(cpf) {

        const user = await User.findOne({ where: { cpf: cpf } })

        if (!user) {
            const error = new Error('User not found');
            error.status = 'NOT_FOUND';
            throw error
        }

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
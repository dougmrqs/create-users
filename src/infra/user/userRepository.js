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

    async createOne(name, email, cpf, age) {
        
        const user = await User.findOne({ where: { cpf: cpf } })

        if (!user) {
            const createdUser = await User.create(
                {
                    name: name,
                    email: email,
                    cpf: cpf,
                    age: age
                });
            return createdUser
        }

        else if (user) {
            const error = new Error('User already exists')
            error.status = 'ALREADY_EXISTS'
            throw error
        }


    };

};

module.exports = new UserRepository();
const User = require('../../domain/user/User');

class UserRepository {

    constructor({ UserModel }) {
        this.UserModel = UserModel;
    }

    async findByCpf(cpf) {

        const foundUser = await this.UserModel.findOne({ where: { cpf: cpf } })

        if (!foundUser) {
            const error = new Error('User not found');
            error.status = 'NOT_FOUND';
            throw error
        }
        const user = new User({ name: foundUser.name, email: foundUser.email, cpf: foundUser.cpf, age: foundUser.age })
        user.id = foundUser.id;
        return user
    };

    async addOne(user) {

        const userFound = await this.UserModel.findOne({ where: { cpf: user.cpf } })

        if (!userFound) {

            const createdUser = await this.UserModel.create(
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

module.exports = UserRepository;
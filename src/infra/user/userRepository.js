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

    async findById(id) {

        const foundUser = await this.UserModel.findOne({ where: { id: id } })

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

    async updateOne(userData) {

        try {
            await this.UserModel.update(userData, { where: { cpf: userData.cpf } });
            const updatedUser = await this.UserModel.findOne({ where: { cpf: userData.cpf } })
            const user = new User({ name: updatedUser.name, email: updatedUser.email, cpf: updatedUser.cpf, age: updatedUser.age })
            user.id = updatedUser.id;
            return user
        }
        catch (error) {
            console.log(error);
        }

    };

};

module.exports = UserRepository;
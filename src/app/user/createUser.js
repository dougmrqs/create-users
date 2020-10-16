const { User, Mailer } = require('../../domain/user');
const userRepository = require('../../infra/user/userRepository')


async function createUser(name, email, cpf, age) {

    const user = new User(name, email, cpf, age);

    if (user.legalAge() && user.validCPF()) {
        const response = await userRepository.createOne(name, email, cpf, age);
        // const mailer = new Mailer();
        // mailer.sendConfirmationMail(email);
        return response;

    }

    else if (!user.validCPF()) {
        const error = new Error("Invalid CPF")
        error.status = 'INVALID_CPF'
        throw error
    }
    else if (!user.legalAge()) {
        const error = new Error("Invalid age")
        error.status = 'INVALID_AGE'
        throw error
    }
}


module.exports = createUser;
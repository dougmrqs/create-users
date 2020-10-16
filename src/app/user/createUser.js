const { User, Mailer } = require('../../domain/user');
const userRepository = require('../../infra/user/userRepository')


async function createUser({ name, email, cpf, age }) {

    const user = new User({ name: name, email: email, cpf: cpf, age: age });
    if (user.legalAge() && user.validCPF()) {
        const newUser = await userRepository.addOne(user);
        // console.log(newUser)
        // const mailer = new Mailer();
        // mailer.sendConfirmationMail(email);
        return newUser;

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
const { User } = require('../../domain/user');
const ConfirmationEmail = require('../../domain/mailer/UserCreationMail');


function makeCreateUser({ userRepository, mailService }) {

    return async function createUser({ name, email, cpf, age }) {

        const user = new User({ name: name, email: email, cpf: cpf, age: age });

        if (user.legalAge() && user.validCPF()) {
            const newUser = await userRepository.addOne(user);

            const confirmationEmail = new ConfirmationEmail({ destination: user.email });

            await mailService.sendMail(confirmationEmail);

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
}

module.exports = makeCreateUser;
const { User } = require('../../domain/user');
const ConfirmationEmail = require('../../domain/mailer/UserCreationMail');


function makeCreateUser({ userRepository, mailService }) {

    return async function createUser({ name, email, cpf, age }) {

        const user = new User({ name: name, email: email, cpf: cpf, age: age });

        try {
            if (user.validate()) {
                const newUser = await userRepository.addOne(user);

                const confirmationEmail = new ConfirmationEmail({ destination: user.email });

                await mailService.sendMail(confirmationEmail);

                return newUser;
            }
        } catch (error) {
            throw error;
        }
    }
}

module.exports = makeCreateUser;
const { User } = require('../models')
const { AgeValidator, CPFValidator, Mailer } = require('../services');

class UsersController {

    async store(req, res) {

        const { name, email, cpf, age } = req.body;

        var user = await User.findOne({ where: { cpf } });

        if (user) return res.status(409).send({ message: 'User already exists' })

        else if (!user && CPFValidator(cpf) && AgeValidator(age)) {
            try {
                user = await User.create({ name, email, cpf, age });
                const mailer = new Mailer();
                mailer.sendConfirmationMail(email);
                return res.sendStatus(201);
            }
            catch (error) {
                console.log(error)
                return res.status(500).send(error.errors);
            }
        }

        else if (!CPFValidator(cpf)) return res.status(400).json({ message: "Invalid CPF" })
        else if (!AgeValidator(age)) return res.status(400).json({ message: "Invalid Age" })

        else return res.sendStatus(400);
    };
};

module.exports = new UsersController();
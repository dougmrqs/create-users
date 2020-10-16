const createUser = require('../../app/user/createUser');

class UsersController {

    async store(req, res) {
        const { name, email, cpf, age } = req.body;
        // console.log( name, email, cpf, age )
        try {
            await createUser(name, email, cpf, age)
            return res.status(201).send({ message: 'User created' })
        }
        catch (error) {
            if (error.status == 'ALREADY_EXISTS') res.status(409).send({ message: 'User already exists' })
            else if (error.status == 'INVALID_CPF') return res.status(400).json({ message: "Invalid CPF" })
            else if (error.status == 'INVALID_AGE') return res.status(400).json({ message: "Invalid Age" })
        }
    };
};

module.exports = new UsersController();
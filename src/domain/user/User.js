const CPFValidator = require('./dataValidation/CPFValidator')

class User {

    constructor({ name, email, cpf, age }) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.age = age
    }

    legalAge() {
        return this.age > 18
    }

    validCPF() {
        return CPFValidator(this.cpf)
    }

    validate() {
        if (!this.legalAge()) {
            const error = new Error('Invalid age')
            error.status = 'INVALID_AGE'
            throw error
        } else if (!this.validCPF()) {
            const error = new Error('Invalid CPF')
            error.status = 'INVALID_CPF'
            throw error
        } else return (this.legalAge() && this.validCPF())
    }

    changeInfo({ email, age }) {
        if (email) { this.email = email }
        if (age) { this.age = age }
    }
}

module.exports = User;
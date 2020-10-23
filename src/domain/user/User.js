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

    changeInfo({ email, age }) {
        if (email) { this.email = email }
        if (age) { this.age = age }
    }
}

module.exports = User;
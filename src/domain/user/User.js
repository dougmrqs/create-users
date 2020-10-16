const CPFValidator = require('./dataValidation/CPFValidator')

class User {

    constructor( name, email, cpf, age ) {
        this.name = name;
        this.email = email;
        this.cpf = cpf;
        this.age = age
    }

    legalAge() {
        return this.age > 18 ? true : false
    }

    validCPF() {
        return CPFValidator(this.cpf)
    }
}

module.exports = User;
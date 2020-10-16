const CPFValidator = require('./dataValidation/CPFValidator');

const Mailer = require('./mailing/mailingService');

const User = require('./User.js')

module.exports = { CPFValidator, Mailer, User }
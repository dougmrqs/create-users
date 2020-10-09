const AgeValidator = require('./dataValidation/AgeValidator');
const CPFValidator = require('./dataValidation/CPFValidator');

const Mailer = require('./mailing/mailingService');


module.exports = { AgeValidator, CPFValidator, Mailer }
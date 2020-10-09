const { Mailer } = require('./index');

mailer = new Mailer();

try {
    // mailer.later(5000);
    (async () => await mailer.sendConfirmationMail('foo@bar.com'))();
}
catch(error) { console.log( error )}
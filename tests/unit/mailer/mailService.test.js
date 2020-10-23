const mailService = require('../../../src/infra/mailer/mailService')

describe('Mail Service testing', () => {
    it('should send an e-mail to a given address when called', async () => {
        const email = {
            destination: 'd@d.com',
            title: 'Confirmation',
            body: 'E-mail of confirmation',
        }

        await expect(mailService.sendMail(email)).resolves.toHaveProperty('status', 'SENT');
    });
});
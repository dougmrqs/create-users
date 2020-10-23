const mailService = {
    sendMail: async (mail) => {
        const sentMail = {
          ...mail,
          status: 'SENT'
        }

        return Promise.resolve(sentMail)
    }
};

module.exports = mailService;
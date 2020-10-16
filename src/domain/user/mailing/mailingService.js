
class Mailer {

    sendConfirmationMail(address) {
        return new Promise((resolve, reject) => {
            console.log(`Sending a confirmation mail to ${address}...`)
            setTimeout(() => {console.log(`Confirmation mail sent to ${address}`)}, 5000)
        }) 
    };
};

module.exports = Mailer;
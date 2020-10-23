class UserCreationMail {
    constructor({ destination }) {
        this.destination = destination;
        this.title = 'User creation confirmation';
        this.body = 'A new user has been created with your e-mail address';        
    }
};

module.exports = UserCreationMail;
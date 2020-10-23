const { User: UserModel } = require('./infra/database/models'); // depends on nothing
const UserRepository = require('./infra/user/userRepository'); // depends on domain user and user model
const makeCreateUser = require('./app/user/createUser'); // depends on user repository, mailer and domain user
const makeUpdateUser = require('./app/user/updateUser'); // depends on user repository, mailer and domain user

const mailService = require('./infra/mailer/mailService');

const userRepository = new UserRepository({
    UserModel
});

const createUser = makeCreateUser({ userRepository, mailService });
const updateUser = makeUpdateUser({ userRepository });

module.exports = {
    createUser, updateUser
};
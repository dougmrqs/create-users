const { User: UserModel } = require('./infra/database/models'); // depends on nothing
const UserRepository = require('./infra/user/userRepository'); // depends on domain user and user model
const makeCreateUser = require('./app/user/createUser'); // depends on user repository, mailer and domain user

const userRepository = new UserRepository({
    UserModel
});

const createUser = makeCreateUser({ userRepository })

module.exports = {
    createUser
}
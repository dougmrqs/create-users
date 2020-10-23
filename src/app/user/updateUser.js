// const { User } = require("../../domain/user");


function makeUpdateUser({ userRepository }) {
    return async function updateUser(userData) {

        var user = await userRepository.findById(userData.id);

        user.changeInfo({ email: userData.email, age: userData.age });

        if (user.legalAge()) {
            const updatedUser = await userRepository.updateOne(user);
            return updatedUser;
        } else if (!user.legalAge()) {
            const error = new Error('Invalid age');
            error.status = 'INVALID_AGE';
            throw error;
        };
    };
};

module.exports = makeUpdateUser;
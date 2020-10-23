// const { User } = require("../../domain/user");


function makeUpdateUser({ userRepository }) {
    return async function updateUser(userData) {

        var user = await userRepository.findById(userData.id);

        user.changeInfo({ email: userData.email, age: userData.age });

        try {
            if (user.validate()) {
                const updatedUser = await userRepository.updateOne(user);
                return updatedUser;
            }
        } catch (error) {
            throw error;
        };
    };
};


module.exports = makeUpdateUser;
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            email: DataTypes.STRING,
            age: DataTypes.INTEGER,
            cpf: DataTypes.STRING
        },

    );

    User.prototype.checkAge = (age) => age > 18 ? true : false

    return User;
};

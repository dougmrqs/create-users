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

    return User;
};

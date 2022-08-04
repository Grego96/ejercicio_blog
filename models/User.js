const bcrypt = require("bcrypt");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model {}

  User.init(
    {
      id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
      },
      firstname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeBulkCreate: async (users, options) => {
          for (const user of users) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeCreate: async (user, options) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    },
  );
  return User;
};

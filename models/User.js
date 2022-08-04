const bcrypt = require("bcrypt");

module.exports = (sequelize, Model, DataTypes) => {
  class User extends Model { }

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

        validate: {
          notEmpty: true,
        }
      },
      lastname: {
        type: DataTypes.STRING,
        allowNull: false,

        validate: {
          notEmpty: true,
        }
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [8, 50],
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: "user",
      hooks: {
        beforeBulkCreate: async (users) => {
          for (const user of users) {
            user.password = await bcrypt.hash(user.password, 10);
          }
        },
        beforeCreate: async (user) => {
          user.password = await bcrypt.hash(user.password, 10);
        },
      },
    },
  );
  return User;
};

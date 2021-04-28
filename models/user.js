"use strict";
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      username: DataTypes.STRING,
      name: {
        type: DataTypes.STRING
      },
      secondName: {
        type: DataTypes.STRING
      },
      fatherName: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true
        },
        unique: {
          args: true,
          msg: "Email address already in use!"
        }
      },
      password: DataTypes.TEXT,
      email_confirmed: DataTypes.BOOLEAN
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "users"
    }
  );
  User.associate = function(models) {};
  return User;
};

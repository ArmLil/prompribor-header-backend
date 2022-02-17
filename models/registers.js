"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers = sequelize.define(
    "Registers",
    {
      address: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      sizeRegister: DataTypes.INTEGER,
      dataType: DataTypes.STRING,
      appointment: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Registers",
    }
  );
  Registers.associate = function (models) {
    Registers.hasMany(models.Registers_Controllers_values, {
      as: "values",
      foreignKey: "registerAddress",
    });
  };
  return Registers;
};

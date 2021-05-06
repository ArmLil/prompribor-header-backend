"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers = sequelize.define(
    "Registers",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      address: DataTypes.STRING,
      sizeRegister: DataTypes.INTEGER,
      recordable: DataTypes.BOOLEAN,
      dataType: DataTypes.STRING,
      appointment: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Registers"
    }
  );
  Registers.associate = function(models) {
    Registers.hasMany(models.Registers_Controllers_values, {
      as: "values",
      foreignKey: "registerAddress"
    });
  };
  return Registers;
};

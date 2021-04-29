"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers_Controllers_values = sequelize.define(
    "Registers_Controllers_values",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      registerId: DataTypes.UUID,
      controllerId: DataTypes.UUID,
      value: DataTypes.STRING
    },
    {}
  );
  Registers_Controllers_values.associate = function(models) {
    // associations can be defined here
  };
  return Registers_Controllers_values;
};
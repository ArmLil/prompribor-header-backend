"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers_Controllers_values = sequelize.define(
    "Registers_Controllers_values",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      registerAddress: {
        type: DataTypes.STRING,
        references: {
          model: "Registers",
          key: "address",
        },
      },
      controllerModbusId: {
        type: DataTypes.STRING,
        references: {
          model: "Controllers",
          key: "modbusId",
        },
      },
      value: DataTypes.STRING,
    },
    {}
  );
  Registers_Controllers_values.associate = function (models) {
    Registers_Controllers_values.belongsTo(models.Registers, {
      as: "register",
      targetKey: "address",
      foreignKey: "registerAddress",
    });
  };
  return Registers_Controllers_values;
};

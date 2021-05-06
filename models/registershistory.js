"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersHistory = sequelize.define(
    "RegistersHistory",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      registerAddress: DataTypes.STRING,
      controllerModbusId: DataTypes.STRING,
      value: DataTypes.STRING,
    },
    { freezeTableName: true }
  );
  RegistersHistory.associate = function (models) {
    // associations can be defined here
  };
  return RegistersHistory;
};

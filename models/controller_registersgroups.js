"use strict";
module.exports = (sequelize, DataTypes) => {
  const Controller_RegistersGroups = sequelize.define(
    "Controller_RegistersGroups",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      controllerModbusId: DataTypes.STRING,
      registersGroupId: DataTypes.UUID,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Controller_RegistersGroups",
    }
  );
  Controller_RegistersGroups.associate = function (models) {
    // associations can be defined here
  };
  return Controller_RegistersGroups;
};

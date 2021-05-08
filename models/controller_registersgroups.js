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
      controllerModbusId: {
        type: DataTypes.STRING,
        references: {
          model: "Controllers",
          key: "modbusId",
        },
      },
      registersGroupId: {
        type: DataTypes.UUID,
        references: {
          model: "RegistersGroups",
          key: "id",
        },
      },
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

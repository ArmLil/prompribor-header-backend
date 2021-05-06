"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersGroups_Registers = sequelize.define(
    "RegistersGroups_Registers",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      registerAddress: DataTypes.STRING,
      registersGroupId: DataTypes.UUID,
      isMonitored: DataTypes.BOOLEAN,
      createHistory: DataTypes.BOOLEAN,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "RegistersGroups_Registers",
    }
  );
  RegistersGroups_Registers.associate = function (models) {};
  return RegistersGroups_Registers;
};

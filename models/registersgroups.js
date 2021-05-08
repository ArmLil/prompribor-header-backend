"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersGroups = sequelize.define(
    "RegistersGroups",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      name: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "RegistersGroups",
    }
  );
  RegistersGroups.associate = function (models) {
    RegistersGroups.belongsToMany(models.Registers, {
      as: "registers",
      through: models.RegistersGroups_Registers,
      foreignKey: "registersGroupId",
      otherKey: "registerAddress",
    });
    // Controllers.belongsToMany(models.RegistersGroups, {
    //   as: "registersGroups",
    //   through: models.Controller_RegistersGroups,
    //   foreignKey: "controllerModbusId",
    //   otherKey: "registersGroupId",
    // });
  };
  return RegistersGroups;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersGroups = sequelize.define(
    "RegistersGroups",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: DataTypes.STRING,
      relatedJournal: DataTypes.STRING,
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

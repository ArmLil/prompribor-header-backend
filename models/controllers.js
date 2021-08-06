"use strict";
module.exports = (sequelize, DataTypes) => {
  const Controllers = sequelize.define(
    "Controllers",
    {
      modbusId: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      line: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.TEXT,
      commCenterPath: {
        type: DataTypes.STRING,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Controllers",
    }
  );
  Controllers.associate = function (models) {
    // associations can be defined here
    Controllers.belongsTo(models.CommunicationCenters, {
      as: "commCenter",
      targetKey: "path",
      foreignKey: "commCenterPath",
    });
    Controllers.belongsToMany(models.RegistersGroups, {
      as: "registersGroups",
      through: models.Controller_RegistersGroups,
      foreignKey: "controllerModbusId",
      otherKey: "registersGroupId",
    });
    Controllers.belongsToMany(models.Registers, {
      as: "registers",
      through: models.Registers_Controllers_values,
      foreignKey: "controllerModbusId",
      otherKey: "registerAddress",
    });
    Controllers.hasMany(models.Registers_Controllers_values, {
      as: "values",
      foreignKey: "controllerModbusId",
    });
  };
  return Controllers;
};

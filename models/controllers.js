"use strict";
module.exports = (sequelize, DataTypes) => {
  const Controllers = sequelize.define(
    "Controllers",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      modbusId: DataTypes.STRING,
      description: DataTypes.TEXT,
      communicationCenterId: {
        type: DataTypes.UUID
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Controllers"
    }
  );
  Controllers.associate = function(models) {
    // associations can be defined here
    Controllers.belongsTo(models.CommunicationCenters, {
      as: "commCenter",
      targetKey: "id",
      foreignKey: "communicationCenterId"
    });
    Controllers.belongsToMany(models.RegistersGroups, {
      as: "registersGroups",
      through: models.Controller_RegistersGroups,
      foreignKey: "controllerId",
      otherKey: "registersGroupId"
    });
    Controllers.belongsToMany(models.Registers, {
      as: "registers",
      through: models.Registers_Controllers_values,
      foreignKey: "controllerId",
      otherKey: "registerId"
    });
  };
  return Controllers;
};

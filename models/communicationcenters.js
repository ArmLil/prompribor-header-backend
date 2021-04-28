"use strict";
module.exports = (sequelize, DataTypes) => {
  const CommunicationCenters = sequelize.define(
    "CommunicationCenters",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      name: DataTypes.STRING,
      distance: DataTypes.STRING,
      port: DataTypes.STRING,
      host: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "CommunicationCenters"
    }
  );
  CommunicationCenters.associate = function(models) {
    // associations can be defined here
    CommunicationCenters.hasOne(models.Controllers, {
      as: "controller",
      foreignKey: "communicationCenterId"
    });
  };
  return CommunicationCenters;
};

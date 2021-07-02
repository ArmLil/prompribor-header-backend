"use strict";
module.exports = (sequelize, DataTypes) => {
  const CommunicationCenters = sequelize.define(
    "CommunicationCenters",
    {
      path: {
        type: DataTypes.STRING,
        primaryKey: true,
      },
      name: DataTypes.STRING,
      index: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      len: DataTypes.STRING,
      port: DataTypes.STRING,
      host: DataTypes.STRING,
      status: DataTypes.STRING,
      description: DataTypes.TEXT,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "CommunicationCenters",
    }
  );
  CommunicationCenters.associate = function (models) {
    // associations can be defined here
    CommunicationCenters.hasMany(models.Controllers, {
      as: "controller",
      foreignKey: "commCenterPath",
    });
  };
  return CommunicationCenters;
};

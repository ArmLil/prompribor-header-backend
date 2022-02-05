"use strict";
module.exports = (sequelize, DataTypes) => {
  const BridgePolylinePoints = sequelize.define(
    "BridgePolylinePoints",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      index: DataTypes.STRING,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "BridgePolylinePoints",
    }
  );
  BridgePolylinePoints.associate = function (models) {
    // associations can be defined here
  };
  return BridgePolylinePoints;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const MapPolylinePoints = sequelize.define(
    "MapPolylinePoints",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      index: DataTypes.STRING,
      lat: DataTypes.STRING,
      len: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "MapPolylinePoints",
    }
  );
  MapPolylinePoints.associate = function (models) {
    // associations can be defined here
  };
  return MapPolylinePoints;
};

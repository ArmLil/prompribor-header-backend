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
      lon: DataTypes.STRING,
      type: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {}
  );
  MapPolylinePoints.associate = function (models) {
    // associations can be defined here
  };
  return MapPolylinePoints;
};

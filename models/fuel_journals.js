"use strict";
module.exports = (sequelize, DataTypes) => {
  const Fuel_Journals = sequelize.define(
    "Fuel_Journals",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      temperature: DataTypes.STRING,
      density: DataTypes.STRING,
      current_volume: DataTypes.STRING,
      current_mass: DataTypes.STRING,
      total_volume: DataTypes.STRING,
      total_mass: DataTypes.STRING,
      note: DataTypes.STRING,
      commCenterId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Fuel_Journals",
    }
  );
  Fuel_Journals.associate = function (models) {
    // associations can be defined here
  };
  return Fuel_Journals;
};

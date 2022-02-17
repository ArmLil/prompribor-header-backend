"use strict";
module.exports = (sequelize, DataTypes) => {
  const CommunicationCenters = sequelize.define(
    "CommunicationCenters",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      path: {
        type: DataTypes.STRING,
        // primaryKey: true,
      },
      name: DataTypes.STRING,
      index: DataTypes.INTEGER,
      lat: DataTypes.STRING,
      lon: DataTypes.STRING,
      tablePosition: DataTypes.STRING,
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
      as: "controllers",
      foreignKey: "commCenterPath",
      sourceKey: "path",
    });
    CommunicationCenters.hasMany(models.Avarii_Journals, {
      as: "avarii_journal_data",
      foreignKey: "commCenterId",
    });
    CommunicationCenters.hasMany(models.Donesenii_Journals, {
      as: "donesenii_journal_data",
      foreignKey: "commCenterId",
    });
    CommunicationCenters.hasMany(models.Nasosi_Journals, {
      as: "nasosi_journal_data",
      foreignKey: "commCenterId",
    });
    CommunicationCenters.hasMany(models.Fuel_Journals, {
      as: "fuel_journal_data",
      foreignKey: "commCenterId",
    });
  };
  return CommunicationCenters;
};

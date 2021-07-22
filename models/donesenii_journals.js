"use strict";
module.exports = (sequelize, DataTypes) => {
  const Donesenii_Journals = sequelize.define(
    "Donesenii_Journals",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      fromWho: DataTypes.STRING,
      donesenii: DataTypes.STRING,
      executer: DataTypes.STRING,
      note: DataTypes.STRING,
      commCenterPath: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Donesenii_Journals",
    }
  );
  Donesenii_Journals.associate = function (models) {
    // associations can be defined here
  };
  return Donesenii_Journals;
};

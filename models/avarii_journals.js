"use strict";
module.exports = (sequelize, DataTypes) => {
  const Avarii_Journals = sequelize.define(
    "Avarii_Journals",
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
      avarii: DataTypes.STRING,
      executor: DataTypes.STRING,
      note: DataTypes.STRING,
      commCenterId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Avarii_Journals",
    }
  );
  Avarii_Journals.associate = function (models) {
    // associations can be defined here
  };
  return Avarii_Journals;
};

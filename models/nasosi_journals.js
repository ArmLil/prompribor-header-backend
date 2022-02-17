"use strict";
module.exports = (sequelize, DataTypes) => {
  const Nasosi_Journals = sequelize.define(
    "Nasosi_Journals",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
      },
      date: DataTypes.STRING,
      time: DataTypes.STRING,
      line: DataTypes.STRING,
      P_in: DataTypes.STRING,
      P_out: DataTypes.STRING,
      revs: DataTypes.STRING,
      note: DataTypes.STRING,
      commCenterId: DataTypes.STRING,
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Nasosi_Journals",
    }
  );
  Nasosi_Journals.associate = function (models) {
    // associations can be defined here
  };
  return Nasosi_Journals;
};

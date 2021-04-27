"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersGroups = sequelize.define(
    "RegistersGroups",
    {
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "RegistersGroups"
    }
  );
  RegistersGroups.associate = function(models) {
    // associations can be defined here
  };
  return RegistersGroups;
};

"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers = sequelize.define(
    "Registers",
    {
      addressRegister: DataTypes.STRING,
      sizeRegister: DataTypes.STRING,
      recordable: DataTypes.BOOLEAN,
      dataType: DataTypes.STRING,
      appointment: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Registers"
    }
  );
  Registers.associate = function(models) {
    // associations can be defined here
  };
  return Registers;
};

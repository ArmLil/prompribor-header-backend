"use strict";
module.exports = (sequelize, DataTypes) => {
  const Registers = sequelize.define(
    "Registers",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      addressRegister: DataTypes.STRING,
      sizeRegister: DataTypes.INTEGER,
      recordable: DataTypes.BOOLEAN,
      dataType: DataTypes.STRING,
      appointment: DataTypes.STRING,
      description: DataTypes.TEXT
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

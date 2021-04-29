"use strict";
module.exports = (sequelize, DataTypes) => {
  const RegistersHistory_full = sequelize.define(
    "RegistersHistory_full",
    {
      id: {
        type: DataTypes.UUID,
        autoIncrement: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
      },
      registerId: DataTypes.UUID,
      controllerId: DataTypes.UUID,
      value: DataTypes.STRING
    },
    { freezeTableName: true }
  );
  RegistersHistory_full.associate = function(models) {
    // associations can be defined here
  };
  return RegistersHistory_full;
};

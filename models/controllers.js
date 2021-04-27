"use strict";
module.exports = (sequelize, DataTypes) => {
  const Controllers = sequelize.define(
    "Controllers",
    {
      name: DataTypes.STRING,
      modbusId: DataTypes.STRING,
      description: DataTypes.STRING,
      communicationCenterId: {
        type: DataTypes.INTEGER
      }
    },
    {
      timestamps: true,
      paranoid: true,
      underscored: false,
      tableName: "Controllers"
    }
  );
  Controllers.associate = function(models) {
    // associations can be defined here
    Controllers.belongsTo(models.CommunicationCenters, {
      as: "commCenter",
      targetKey: "id",
      foreignKey: "communicationCenterId"
    });
  };
  return Controllers;
};

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Controller_RegistersGroups", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      controllerModbusId: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registersGroupId: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      deletedAt: {
        type: Sequelize.DATE,
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Controller_RegistersGroups");
  },
};

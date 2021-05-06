"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RegistersGroups_Registers", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      registerAddress: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      registersGroupId: {
        type: Sequelize.UUID,
        allowNull: false,
      },
      isMonitored: {
        type: Sequelize.BOOLEAN,
      },
      createHistory: {
        type: Sequelize.BOOLEAN,
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
    return queryInterface.dropTable("RegistersGroups_Registers");
  },
};

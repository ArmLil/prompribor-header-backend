"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("RegistersHistory_full", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false
      },
      registerId: {
        type: Sequelize.UUID
      },
      controllerId: {
        type: Sequelize.UUID
      },
      value: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("RegistersHistory_full");
  }
};

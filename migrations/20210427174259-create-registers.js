"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Registers", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false
      },
      addressRegister: {
        type: Sequelize.STRING
      },
      sizeRegister: {
        type: Sequelize.INTEGER
      },
      recordable: {
        type: Sequelize.BOOLEAN
      },
      dataType: {
        type: Sequelize.STRING
      },
      appointment: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.TEXT
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      deletedAt: {
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Registers");
  }
};

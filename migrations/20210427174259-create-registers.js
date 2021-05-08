"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Registers", {
      address: {
        allowNull: false,
        type: Sequelize.STRING,
        primaryKey: true,
      },
      sizeRegister: {
        type: Sequelize.INTEGER,
      },
      recordable: {
        type: Sequelize.BOOLEAN,
      },
      dataType: {
        type: Sequelize.STRING,
      },
      appointment: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.TEXT,
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
    return queryInterface.dropTable("Registers");
  },
};

"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Fuel_Journals", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      date: {
        type: Sequelize.STRING,
      },
      time: {
        type: Sequelize.STRING,
      },
      temperature: {
        type: Sequelize.STRING,
      },
      density: {
        type: Sequelize.STRING,
      },
      current_volume: {
        type: Sequelize.STRING,
      },
      current_mass: {
        type: Sequelize.STRING,
      },
      total_volume: {
        type: Sequelize.STRING,
      },
      total_mass: {
        type: Sequelize.STRING,
      },
      note: {
        type: Sequelize.STRING,
      },
      commCenterPath: {
        type: Sequelize.STRING,
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
    return queryInterface.dropTable("Fuel_Journals");
  },
};

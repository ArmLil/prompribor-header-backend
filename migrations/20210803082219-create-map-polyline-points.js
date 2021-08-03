"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("MapPolylinePoints", {
      id: {
        allowNull: false,
        type: Sequelize.UUID,
        primaryKey: true,
        autoIncrement: false,
      },
      index: {
        type: Sequelize.STRING,
      },
      lat: {
        type: Sequelize.STRING,
      },
      len: {
        type: Sequelize.STRING,
      },
      type: {
        type: Sequelize.STRING,
      },
      description: {
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
    return queryInterface.dropTable("MapPolylinePoints");
  },
};
